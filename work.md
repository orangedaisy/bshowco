---
layout: page.njk
title: Work
---
<div class="flow">

{% include 'toc.md' %}

## Career

### Case Studies

<ul>
    {%- for post in collections.revalize -%}
        <li><a href="{{ post.url }}">{{ post.data.title }}</a></li>
    {%- endfor -%}
</ul>

### Resume

<details class="flow">
<summary>Expand to view resume</summary>

#### Profile

User Experience Designer with 11+ years of experience in design systems,
front-end development, and accessibility across enterprise B2B products and
marketing. Builds the shared foundations of component libraries,
design-to-development handoff, and experimentation tooling that other teams
rely on to ship consistently. Pairs hands-on craft with process and governance
work that scales across teams.

#### Work Experience

{% renderFile "./_includes/work/dnb.md" %}

***

{% renderFile "./_includes/work/icf.md" %}

***

{% renderFile "./_includes/work/revalize.md" %}
</details>

## Personal

{% renderFile "./_includes/work/scorecard.md" %}
{% renderFile "./_includes/work/pokedex.md" %}

</div>
