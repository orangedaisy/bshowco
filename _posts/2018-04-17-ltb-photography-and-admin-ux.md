---
layout: post
title: "LTB Photography and Admin UX"
---

In my daily work at [FPX](https://www.fpx.com), I'm usually concerned with the
"end-user UX"&mdash;that is, what's it like for the guy at the end of the chain
who actually uses the software as part of his job? We do have some
administrative tools for general configuration and tweaks, but since they're
largely for internal use, they rarely get much UX love. When [orange
daisy](https://www.orangedaisy.co) was tasked with creating the website for [LTB
Photography](http://www.ltbphotography.com), it gave me a chance to really focus
on making the site as easy and delightful to administrate as it is to use.

{% include toc.md %}

## Content planning

Before we could focus on making the admin area easy to use, we had to figure out
what content was going to be on the website. The two most complex parts of
Lori's site, from a content-editing point of view, are the
[Investments](http://www.ltbphotography.com/investments/) and
[Testimonials](http://www.ltbphotography.com/testimonials/) pages. The content
itself may not be that crazy, but it does need to be adaptable to a few
different types of views.

For the Investments, we decided on a "home" page that listed each investment,
along with a relevant picture, a blurb describing the photo session, and a link
to the particular investment's pricing page. The testimonials required an
investment name, the customer's name, and their comments.

{% include figure.html src='/assets/images/ltbp-investments-overview.png'
alt='All Investments page' caption='Wedding investment panel on the all
investments page' %}

{% include figure.html src='/assets/images/ltbp-single-investment.png'
alt='Wedding Investment page' caption='Detail view of wedding investment' %}

{% include figure.html src='/assets/images/ltbp-testimonials.png' alt='All
Testimonials page' caption='All the Testimonials' %}

## Custom post types

With the plan in place, I set to work creating an Investment and Testimonial
custom post type. I used a combination of built-in WordPress functionality and
the [Advanced Custom Fields](https://www.advancedcustomfields.com/) plugin to
add simple creation pages for Lori.

{% include figure.html src='/assets/images/ltbp-new-investment.png' alt='New
Investment page' caption='Simple page for adding a new Investment' %}

{% include figure.html src='/assets/images/ltbp-new-testimonial.png' alt='New
Testimonial page' caption='Simple page for adding a new Testimonial' %}

Taking the time to create these simple creation pages for Lori means that it's
trivial for her to add new content to her website. She doesn't have to worry
about special HTML or Markdown formatting, or whether or not she used the
correct heading level in the WYSIWYG editor. All we need are some text strings
and the templates take care of the rest.

## Tidying the rest of the admin area

There's one last little catch that we had to address before handing the keys
over to Lori. It can be tempting to give the client "admin" level access in
WordPress, but it's usually too much power. More importantly, there are settings
and configuration areas that can be distracting to the client when they're just
wanting to add or edit some content.

{% include figure.html src='/assets/images/ltbp-admin.png' alt='WordPress admin
view' caption='The standard admin view in WordPress&mdash;lots of links in the
sidebar that just aren\'t relevant or helpful to Lori' %}

In most cases, it's better to give the client an "editor" account. They still
have permissions to control the content of their site, but without the
distractions of the other management links that they really shouldn't be messing
with.

{% include figure.html src='/assets/images/ltbp-editor.png' alt='WordPress
editor view' caption='Lori\'s view when she logs in to manage her site' %}

Much better! Now Lori only sees links that are useful to her&mdash;links to
manage her investments, testimonials, and other content. Creating this targeted
environment for her has helped her keep up with featuring new photo shoots on
her site.

## Wrap up

We often talk about designing and refining the end-user experience and the
"front" of websites and applications. Working on Lori's site was a nice reminder
that UX design encompasses users on *both* sides of our work.
