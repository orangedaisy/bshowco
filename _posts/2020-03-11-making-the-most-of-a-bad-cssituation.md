---
layout: post
title: "Making the Most of a Bad CSSituation"
---

We maintain a decent handful of web applications at FPX to serve our fluid
handling customers. Some of these applications are shiny and new, and contain
pretty well-authored CSS that is easily configured and extended. Other
applications are older, and contain some not-so-great CSS. To be fair, these
older applications were written in a time before CSS could hardly do any of what
it can do now, so some grace is afforded. It does mean, however, that we have to
occasionally make changes to the old stuff&mdash;and that sometimes means
writing CSS that would make you cringe in any other context.

In the following examples we'll look at some fun little challenges I've faced,
and the interesting CSS they've produced, while working on our legacy
applications.

{% include toc.md %}

## Replace image with CSS borders

One of our applications heavily features accordions to help manage the dense
display of information it provides. Like all good accordions, they contain
little arrow icons to help the user discern which state the accordion is
currently in&mdash;open, or closed. Since this app is quite old, these icons are
actually bitmap images.

{% include figure.html src='/assets/images/accordion_closed.png' alt='accordion
closed icon' caption='Straight outta 2000' %}

That's not horribly offensive on its own. CSS couldn't have drawn that back in
2000, so what other options were there? The problem arose when we needed to
update the CSS of this app so that its design more closely aligned with the
newer applications a user may also interact with during a single workflow. This
meant we needed to change the color of those images. And not just once or twice,
but both icons for every single customer that may have changed the icons to
match their brand colors. That could be hundreds of icons! Oof.

Now, could we have gone to the command line to leverage something like
ImageMagick and a little shell scripting to knock this out? Probably. But my
everything-is-a-nail hammer is CSS, so I happily began exploring those options.

You may think we could easily reach for `::before` or `::after` to apply some
unicode arrows, like ▼, and call it a day, but life isn't that simple. Images,
you see, are [replaced
elements](https://developer.mozilla.org/en-US/docs/Web/CSS/Replaced_element).
We're also stuck with an interesting dilemma in determining the accordion's
state. The markup uses inline javascript handlers (I know), so there aren't any
class changes or the like that we can use to help. I'd love to at least climb up
to the element above the `img` and apply pseudo elements there, but that's just
not the reality of the situation.

### CSS borders to the rescue

Although we can't control the `img` itself, we can manipulate the element's
dimensions down to `0`, then use CSS borders to draw an arrow. And since the
actual source of the image changes depending on whether the accordion is open or
closed, we can use that to determine our state. Now we're on to something!

First, some shared styles to set everything up:

```css
/* shared icon styles, requires the `src` attribute to contain `accordion` */
img[src*='accordion'] {
  border-color: transparent;
  border-style: solid;
  display: inline-block;
  height: 0;
  width: 0;
}
```

Then, we peek at the `src` attribute of the image to figure out which arrow we
need to draw:

```css
/* accordion open icon styles, requires the `src` to contain `_open` */
img[src*='_open'] {
  border-top-color: red; /* brand color */
  border-width: 12px 6px; /* arrow pointing down */
}

/* accordion closed icon styles, requires the `src` to contain `_closed` */
img[src*='_closed'] {
  border-left-color: red; /* brand color */
  border-width: 6px 12px; /* arrow pointing right */
}
```

Check it out in the following
[CodePen](https://codepen.io/bobbyshowalter/pen/0019518454bd433cac28fc16eb9444a6):

{% include embed-codepen.html slug-hash='0019518454bd433cac28fc16eb9444a6'
default-tabs='css,result' pen-title='Replace image with CSS border'
preview='true' %}

In the real world, you'll usually get a quick flash of the image-based icon as
the styles load in, since we can't actually do anything to hide the image. And
styling things based on the `src` attribute is extremely brittle. But this is a
legacy app, so we're pretty safe to assume the markup is stagnant and won't
actually be changing any time soon. This is just a stop-gap until we can replace
the application entirely, after all, so we don't need to get too hung up on
making things perfect. It's definitely good enough for the context!

## Add dropdown arrows based on javascript function name

Here's another spicy one.

A couple of years ago, a customer asked if we could add a little arrow icon next
to all nav bar links that contained a dropdown
([Fly-out](https://adrianroselli.com/2020/03/stop-using-drop-down.html#Flyout)?
Need to keep working on my terminology) element. A sensible request, but also a
bit of a panic moment since I do not like to touch the markup in our legacy
applications if I can at all help it. Back to CSS we go!

Predictably, I found that there was no class name differentiation between
regular nav bar links and those with a fly-out. What did make the fly-out links
special, however, was their inline javascript event handler. Thankfully this was
a bit easier to knock out, since we were able to use pseudo elements.

```css
/**
 * Add arrow icon for fly-out links.
 * Assumes link's `onclick` attribute contains `openMenu`.
 */
.navbar-link[onclick*="openMenu"]::after {
  content: '\0025be';
  display: inline-block;
  margin-left: .5em;
}
```

Not too bad, all things considered. This one is a little cleaner than the last,
though tying anything to element attributes like this is still brittle. But,
again, the app is old and not prone to change. If we ever do get in there and
make updates that break this bit of styling, that means we're probably taking
the time to implement a more sensible approach anyway.
