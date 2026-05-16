---
title: 'Store-and-Forward Telemetry for the Konkan Railway'
description: 'Building an opportunistic data offload system using ESP32 and Raspberry Pi Pico to extract diagnostic telemetry from trains on the 740km Konkan route where LTE is absent for hours at a time'
pubDate: 'May 16 2026'
heroImage: '../../assets/blog-placeholder-3.jpg'
category: 
    - projects
    - software engineering
---

## The Problem: 740km of Darkness

Indian Railways runs the Konkan route: 740km through the Western Ghats, 91 tunnels, between Mumbai and Mangalore. LTE does not exist for stretches lasting hours.

Modern trains collect diagnostic data continuously: subsystem health, vibration, temperature, pressure. The standard method to get this off the train is batch streaming over LTE. In the Konkan region, that connection does not come for hours at a time, leaving engineers blind to what happened through that stretch.

The unsolved problem was communication. How do you get data off a moving train reliably when LTE is not an option for hours, and each connectivity window lasts only as long as the train takes to pass through a station?

## The Solution: Opportunistic Offload

I designed a store-and-forward system using low-cost hardware: ESP32 and Raspberry Pi Pico, mounted on the train. The device buffers telemetry continuously and dumps opportunistically at every station pass, without the train needing to stop.

The hardware choice is deliberate. ESP32 provides WiFi and BLE for station-side handoff. The Pico handles the buffering and protocol logic. Combined, the BOM is under $30 per unit — cheap enough to deploy across an entire fleet.

## The Store-and-Forward Protocol

The protocol I built around this worked in prioritised incremental batches. Each pass transmits the new data collected since the last pass first, then appends an overlap window as a second priority:

1. **Priority 1 — New data since last checkpoint**: Everything collected since the last successful station handoff. This is the primary payload.

2. **Priority 2 — Overlap window**: Everything from the last acknowledged checkpoint plus a fixed buffer of data collected before it. This ensures that even if a partial transmission gets cut off when the train leaves range, the next station can fill the gap.

This means a failed or partial pass does not create a permanent gap. The next station gives you another attempt, with enough overlap to fill what was missed.

## Deduplication and Reconstruction

On the ground, each station receiver writes incoming batches to local storage. The central aggregator pulls from all stations and runs a deduplication pass:

```
Station A batch:    [t0 — t10] [t5 — t15]  (new + overlap)
Station B batch:    [t12 — t22] [t17 — t27] (new + overlap)
                     ↓
Central aggregator: [t0 — t27] with deduped timestamps
```

The aggregator deduplicates across overlapping batches and reassembles everything into a correctly ordered time-series. Timestamps are the canonical key — if two batches both contain data for `t8`, the aggregator keeps only one copy.

## Why the Overlap Matters

The constraint driving all of this: the data is used for failure investigations. A misaligned timestamp or undetected gap does not just mean missing data. It means attributing an anomaly to the wrong event entirely.

Consider: the train passes through Tunnel 47 at 14:32:15. The vibration sensor spikes at 14:32:17. If the telemetry from that two-minute window is lost because the train left station range mid-transmit, an investigator might look at a different tunnel or a different timestamp entirely.

The overlap window guarantees that any data within a fixed distance of the checkpoint reaches at least one ground receiver. Even if three consecutive station passes all fail mid-transmission, the overlap buffers ensure the data arrives eventually — just spread across multiple stations' batches.

## Offline-First Design

The onboard device runs entirely offline. It has no notion of "connected" or "disconnected" — it simply writes telemetry to a circular buffer and, when it detects a known station access point, initiates a dump. If the connection drops mid-transfer, it notes the last confirmed byte and resumes from that point at the next station.

The buffer is sized for the longest tunnel segment (approximately 90 minutes without a station). At the device's max data rate, this requires roughly 512MB of flash — well within the Pico's capabilities with an external SD card.

## The Ground Station Network

Each station along the route is equipped with a receiver (another ESP32) connected to the railway's fiber backbone. The receivers are dumb — they accept incoming data, write it to disk, and signal the central aggregator that new data is available. The aggregator handles deduplication, ordering, and handoff to the railway's existing diagnostics platform.

Because the receivers are stateless (data is forwarded to the aggregator ASAP), a receiver failure at one station doesn't lose data — the next station catches it through the overlap mechanism.

## Key Learnings

1. **Overlap is cheaper than reliability guarantees.** Making each individual transmission reliable would require directional antennas, train-to-ground handshake protocols, and retransmission logic. Accepting partial failures and fixing them via overlap is simpler and cheaper.

2. **Offline-first is the right default.** If the device assumes it's always offline and treats connectivity as a transient bonus, every edge case (tunnel, bridge, remote stretch) is already handled.

3. **Timestamps are the ground truth.** When you're reassembling from overlapping batches, you need a reliable ordering key. Clock synchronization at the source (GPS time on the train) is non-negotiable.

4. **Cheap hardware forces good software.** With $30 of hardware per unit, you can't throw compute at protocol problems. Every design decision has to justify its complexity against the hardware constraints.

## Tech Stack

`ESP32` `Raspberry Pi Pico` `C++` `MicroPython` `WiFi Direct` `SD Card Storage` `Python` `PostgreSQL`
