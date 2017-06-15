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

<small>2017-06-14</small>

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

[Microsoft have started updating their Grid
support](https://rachelandrew.co.uk/archives/2017/04/04/edge-starts-work-on-their-grid-implementation-update/),
so hopefully this work-around won't be necessary much longer. In the
meantime, this approach can be further improved upon by naming your
columns.

```css
.my-grid-container {
  display: grid;
  grid-template-columns:
    [main-start] 1fr [main-end]
    1rem
    [sidebar-start] minmax(min-content, 15rem) [sidebar-end];
}

#item_one {
  grid-column: main;
}

#item_two {
  grid-column: sidebar;
}
```

Explicitly naming columns allows you to reference them by name
without having to guess which number they actually are. This isn't a big
deal if you only have two columns like the example, but would be helpful for
more complex systems with larger numbers of columns and rows.

* * *

This post will be continually updated as I discover more intersting
things about CSS Grid Layout.
