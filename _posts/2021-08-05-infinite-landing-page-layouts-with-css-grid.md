---
layout: post
title: Infinite Landing Page Layouts with CSS Grid
category: fpx
---

Part of the value-add for the fluid handling SCPQ software at Revalize is the
option for customers to tailor the appearance of the UI to their unique
branding. When we began the development of Portal Center to serve as the new
"front page" of our application suite, I built a powerful, flexible system that
could accommodate any layout a customer could imagine.

{% include toc.md %}

## One page to rule them all

Project Portal was one of the first "modern" applications we launched in 2015.
These newer applications were a marked departure from the "classic" suite, in
that they feature a more casual UI/UX and prominent points of customization for
our customers. While we nailed the ability for customers to easily change
important colors, background images, and more, we did not anticipate the
interest in modifying the layout and appearance of the Project Portal landing
page. Every customer's page looked roughly the same.

{% include figure.html src='/assets/images/landing_pages/old.png' alt=''
caption='Original Project Portal landing page' %}
{% include figure.html src='/assets/images/landing_pages/taco.png' alt=''
caption='Taco Project Portal landing page' %}

## Hands across the sea

Project Portal (and its replacement, Portal Center) don't always sit at the same
place in a user's journey. There are plenty of users who will navigate directly
to this landing page to sign in and begin their work day, but there are others
who may arrive here through some second, third, or fourth link from our
customer's main website. In those cases, having more control over the appearance
of the landing page helps our customers give their users the confidence that
this new environment they're entering is, in fact, under the same umbrella as
the main marketing site they just left.

When we started roadmapping the development of Portal Center in 2019, improving
this landing page experience was top-of-mind. I worked with our internal
customer representatives to assemble a punch-list of "must haves," and combined
that with my own personal notes of feature requests from over the years. The
number one biggest feature request, by a large margin, was the desire to have
more control over the landing page layout. Colors, images, logos&mdash;those
were all nice, but being able to format the page so that it matched the
customer's other marketing and branding efforts was priority number one.

## New kid(s) on the block

As we [discovered a few years ago]({% post_url
2018-06-03-multiple-layouts-made-easy-with-css-grid %}), we can use a single set
of well-formatted HTML to drive near-infinite layout possibilities with CSS Grid
Layout. Our new landing page is nothing more than a collection of "blocks":

```html
<main>
  <div class="c-landing-page g-landing-page">
    <div id="company_logo">
      <img class="c-landing-page__company-logo">
    </div>
    <div id="sales_pitch" class="c-landing-page__sales-pitch">
      <!-- -->
    </div>
    <div id="product_features" class="c-landing-page__product-features">
      <!-- -->
    </div>
    <div id="sign_in" class="c-landing-page__sign-in">
      <!-- -->
    </div>
    <div id="external_links" class="c-landing-page__external-links">
      <!-- -->
    </div>
    <div id="social_media" class="c-landing-page__social-media">
      <!-- -->
    </div>
  </div>
</main>
```

From there, I use CSS Grid Layout and a touch of Flexbox to arrange the pieces
in whatever way the customer needs.

There are five "plug-n-play" layouts available to help our customers get the
ball rolling. Every layout is built on the exact same set of HTML; the layout is
driven entirely by CSS.

{% include figure.html src='/assets/images/landing_pages/1.png' alt='' caption='Portal Center landing page 1' %}
{% include figure.html src='/assets/images/landing_pages/2.png' alt='' caption='Portal Center landing page 2' %}
{% include figure.html src='/assets/images/landing_pages/3.png' alt='' caption='Portal Center landing page 3' %}
{% include figure.html src='/assets/images/landing_pages/4.png' alt='' caption='Portal Center landing page 4' %}
{% include figure.html src='/assets/images/landing_pages/5.png' alt='' caption='Portal Center landing page 5' %}

I have a set of variables and other SCSS helpers to streamline the easier
customization tasks. For something more complex, I build the page from scratch
so I don't have to spend as much time overwriting existing styles.

## In the wild

Here are some examples from real landing pages in use today. Can you spot which
landing page option serves as the foundation for each customer?

{% include figure.html src='/assets/images/landing_pages/acme.png' alt='' caption='"Archimedes" landing page' %}
{% include figure.html src='/assets/images/landing_pages/nov.png' alt='' caption='NOV landing page' %}
{% include figure.html src='/assets/images/landing_pages/brentwood.png' alt='' caption='Brentwood landing page' %}
{% include figure.html src='/assets/images/landing_pages/oilgear.png' alt='' caption='Oilgear landing page' %}

The new landing page functionality in Portal Center has been a breath of fresh
air for our customers. Having total control over the appearance of the landing
page goes a long way in building brand confidence with our users, and helps each
customer's unique implementation of our software stand out from their
competitors.