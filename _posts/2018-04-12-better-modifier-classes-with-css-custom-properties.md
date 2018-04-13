---
layout: post
title: "Better Modifier Classes with CSS Custom Properties"
---

I've used [Sass](https://sass-lang.com) on many different sizes of projects with
many different types of technologies. For the longest time it was a basic
necessity&mdash;regular CSS just didn't have powerful enough tools to manage
larger or more complex styling tasks. Now, however, CSS has a trick up its
sleeve that's been pulling me away from Sass.

CSS Custom Properties are like [Sass
variables](https://sass-lang.com/guide#topic-2) on steroids. Whereas Sass
variables compile down to normal CSS properties as part of your build step, and
are thus useless after the fact, CSS Custom Properties remain live on the page
and require no build step. Chris Coyier has a more in-depth write-up on the
differences between the two [over at
CSS-Tricks](https://css-tricks.com/difference-between-types-of-css-variables/),
so in this post I will just focus on a more targeted use case I encountered
recently.

* * *

* Contents
{:toc}

## The modifier class "problem"

While working on a [particular
concept](https://xd.adobe.com/view/9f408fc6-a0f9-47b0-ad1e-3d6be4ac253a/) for
the redesign of my [freelancing site](http://www.orangedaisy.co), I wound up in
the classic situation of having two components that, apart from a specific
property, were otherwise identical. "A case for modifier classes," I thought to
myself.  But writing a base class with modifier classes that override certain
properties just feels&hellip;weird. I don't think it's wrong, per se, but it
does feel a little silly having to write some CSS that you then immediately
*re*write.

Let's take a look at that old way of writing a typical button component with
modifier classes, and then examine how we might use CSS Custom Properties to
improve things.

## "Old" modifier classes

In the past, you might've configured a "base" button style, then added modifier
classes that override a specific set of properties, like their
`background-color` or `font-size`:

{% include embed-codepen.html slug-hash='YYpNrq' default-tabs='css,result'
pen-title='bshow-better-modifier-classes--old' preview='true' %}

Sass gives us the ability to DRY this up a little bit with lists, maps, and
loops:

{% include embed-codepen.html slug-hash='jYVyxp' default-tabs='css,result'
pen-title='bshow-better-modifier-classes--scss-old' preview='true' %}

In either case, we still have to explicitly type out all the properties we want
to change. It feels clunky writing and rewriting `background-size`, etc. over
and over again.

## "New" modifiers

With CSS Custom Properties, we have more power at our disposal. Since the custom
properties are part of CSS itself, it's easier to see both what is intended to
be modifiable, and make those changes without rewriting so many properties.

We can reassign the custom properties through inline styles (thus eliminating
the modifier classes all together):

{% include embed-codepen.html slug-hash='KZNaxG' default-tabs='html,result'
pen-title='bshow-better-modifier-classes--new-1' preview='true' %}

*__Note__: I realize the custom property names aren't any shorter than the
properties they're meant to replace. In practice, I imagine you'd use any sort
of naming convention that suits your fancy. :)*

Or, if you prefer to use just classes, you can use your normal modifier classes
to redefine only the custom properties. Because you're using both the base *and*
modifier classes together, the scope of your custom properties matches and the
override works.

{% include embed-codepen.html slug-hash='MrbJPx' default-tabs='css,result'
pen-title='bshow-better-modifier-classes--new-2' preview='true' %}
