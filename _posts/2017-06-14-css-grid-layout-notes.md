---
layout: post
title: "CSS Grid Layout Notes"
---

This post will serve as a place to collect various interesting bits I
discover about CSS Grid Layout as I use it in projects.

#### In this post
{:.no_toc}

* Contents
{:toc}

* * *

### IE / Edge doesn't support `grid-{column|row}-gap`

<small>2017-06-14 &middot; <a href="#in-this-post">Back to top</a></small>

We've started using CSS Grid Layout in limited doses at work, and I've
been enjoying the experience so far. The
[browser support](http://caniuse.com/#feat=css-grid) is good, and
[autoprefixer](https://github.com/postcss/autoprefixer) helps fill some of the
gaps in the outdated IE / Edge version of the spec. There's one little
quirk I ran into today, however, that might change the way you use Grid
in your layouts until support improves.

In the [current version of the
spec](https://www.w3.org/TR/css3-grid-layout/#propdef-grid-column-gap),
you can define gutters between your tracks with the `grid-gap`
properties. The [IE / Edge version of the
spec](https://www.w3.org/TR/2011/WD-css3-grid-layout-20110407/),
however, has no such property---not even an analogue that could be
prefixed.

To work around this limitation, you can add "dummy" columns to serve as
your gutters.

```css
/* with proper gaps */
.my-grid-container {
  display: grid;
  grid-column-gap: 1rem;
  grid-template-columns: 1fr minmax(min-content, 15rem);
}

/* for IE / Edge */
.my-grid-container {
  display: -ms-grid;
  -ms-grid-template-columns: 1fr 1rem minmax(min-content, 15rem);
}
```

This works, but the downside is that you now have an extra column to
consider. With the "regular" approach, assigning items to specific
columns is straightforward:

```css
#item_one {
  grid-column: 1;
}

#item_two {
  grid-column: 2;
}
```

For IE / Edge, however, you have to skip the "dummy" column:

```css
#item_one {
  grid-column: 1;
}

#item_two {
  grid-column: 3; /* ugh */
}
```

* * *

### `display: grid` doesn't collapse margins

<small>2018-05-27 &middot; <a href="#in-this-post">Back to top</a></small>

It's a toss-up on whether or not this will be a big deal to you, but it's
important to keep in mind either way. CSS typically collapses the margins
between consecutive blocks [according to a few
rules](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing).
Normally, it works great, and you probably weren't even concerned or aware that
anything was happening. When you enable `display: grid`, however, this behavior
goes away.

CSS Grid is a great way to enhance your long-form content with more interesting
layouts than were previously possible. The "[breaking
out](https://cloudfour.com/thinks/breaking-out-with-css-grid-layout/)" technique
gained a lot of popularity last year, but can suffer from a lack of collapsing
margins without some extra accommodations. Here's a [CodePen
demo](https://codepen.io/bobbyshowalter/pen/WOVoyo?editors=1100) that
illustrates the problem:

{% include embed-codepen.html slug-hash='WOVoyo' default-tabs='css,result'
pen-title='CSS Grid blog post layout' preview='true' %}

By default, the margins between our content blocks collapse, preventing elements
from getting too spread out. When we toggle on CSS Grid to enable our fancy
layout, we no longer benefit from collapsing margins.

Again, this probably isn't a huge deal, but it is worth remembering that your
CSS Grid layouts may require some extra tweaks to keep in line.

Jen Simmons has an excellent [video on
YouTube](https://www.youtube.com/watch?v=jfHNzL5h1Aw) that also covers this
topic.

* * *

This post will be continually updated as I discover more intersting
things about CSS Grid Layout.
