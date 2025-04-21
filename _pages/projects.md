---
layout: default
title: Projects
permalink: /projects/
---

## Featured Work

<div class="project-grid">
  {% for project in site.data.projects %}
    <div class="project-card">
      <h3>{{ project.name }}</h3>
      <p>{{ project.description }}</p>
      <a href="{{ project.link }}" class="btn">
        {% if project.type == 'demo' %}Live Demo{% else %}View Code{% endif %}
      </a>
    </div>
  {% endfor %}
</div>
