---
layout: post
title: "Multiple Layouts Made Easy with CSS Grid"
---

The software we develop at [FPX](https://www.fpx.com) serves a wide
range of customers from a wide range of industries. Designing for so many
different types of users can be daunting&mdash;what works for a group of users
from one company won't necessarily work for another. The most challenging
problem to solve in our designs is the application's various layout
requirements. Thanks to CSS Grid Layout, creating multiple layouts from a single
source of markup has been made, dare I say, trivial.

> **N.B.**: This post references [CSS Grid
> Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout), but
> is not intended to be an introductory tutorial to the technology. If you're
> new to CSS Grid Layout, consider the following resources before reading this
> article:
>
> - [CSS Tricks guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
> - Rachel Andrew's [Grid by Example](https://gridbyexample.com/)
> - Jen Simmons' [Learn CSS
>   Grid](http://jensimmons.com/post/feb-27-2017/learn-css-grid) post

{% include toc.md %}

## The old days

Let's focus on the dashboard for a fictitious application, **Super App
3000**&reg;. Prior to CSS Grid Layout, you might have reached for **Perfect Grid
System**&trade; to handle your layouts. Such a system typically results in
markup that looks like this:

```html
<main>
  <div class="row">
    <div id="module_1" class="col col-md-4">
      <!-- module 1 content -->
    </div>
    <div id="module_2" class="col col-md-4">
      <!-- module 2 content -->
    </div>
    <div id="module_3" class="col col-md-4">
      <!-- module 3 content -->
    </div>
  </div>
</main>
```

Great! With **Perfect Grid System**&trade;, this gives us a layout that displays
as a single column on smaller screens, then switches to three columns at our
medium breakpoint. Everyone is happy.

But then, someone sends in some feedback. Turns out that `#module_1` is way more
important to them than `#module_2` or `#module_3`, so they'd like that to be in
the middle column, and made larger. Easy enough:

```html
<main>
  <div class="row">
    <div id="module_2" class="col col-md-3">
      <!-- module 2 content -->
    </div>
    <div id="module_1" class="col col-md-6">
      <!-- module 1 content -->
    </div>
    <div id="module_3" class="col col-md-3">
      <!-- module 3 content -->
    </div>
  </div>
</main>
```

Cool. We addressed the feedback! Except, as would be expected, other users are
writing in with their own priorities. Some need `#module_3` in the middle. Some
want the original, three column layout back. Still others are asking for even
more arrangements. Chaos! **Perfect Grid System**&trade; wasn't really made to
handle this. It's time for a different approach.

## The new school

CSS Grid Layout is a layout engine baked right into your browser&mdash;no third
party dependencies required. Let's revisit our dashboard, but with a couple of
important modifications. First, we can remove all **Perfect Grid
System**&trade;-specific classes. We also no longer need its wrapper `<div>`, as
we can apply our CSS Grid Layout styles directly to the parent `<main>` element.

```html
<main class="grid">
  <div id="module_1">
    <!-- module 1 content -->
  </div>
  <div id="module_2">
    <!-- module 2 content -->
  </div>
  <div id="module_3">
    <!-- module 3 content -->
  </div>
</main>
```

With this simplified markup, we can now deploy our CSS Grid Styles.

Here's our original three column layout in CSS Grid:

```css
.grid {
  display: grid;
  grid-column-gap: 1rem;
  grid-template-columns: repeat(3, 1fr);
}
```

Notice that we defined the grid at the top-level `.grid` element, and didn't
define any explicit styles for our modules. CSS Grid is pretty smart, and knows
to place our three `#module_` elements within the three columns without any
further input from us.

What about switching `#module_1` and `#module_2` like before?

```css
.grid {
  display: grid;
  grid-column-gap: 1rem;
  grid-template-columns: 1fr 2fr 1fr;
}

#module_1 {
  order: 2;
}

#module_2 {
  order: 1;
}

#module_3 {
  order: 3;
}
```

We increased the size of the middle column to be twice as large as the other
two. We also explicitly defined the `order` of our `#module_`s, which can be
used to tell CSS Grid how to visually order the elements without affecting their
source order. This is all fine and dandy, but how do we handle the case where
multiple users or organizations want their own layout flavor?

At FPX, we tackled this problem with a `data-layout` attribute on the parent
grid element, and a simple user account setting to change it. Here's an
interactive example (best viewed [directly on
CodePen](https://codepen.io/bobbyshowalter/pen/e645405042d329ebbf904ed286c661e8?editors=0100)):

{% include embed-codepen.html slug-hash='e645405042d329ebbf904ed286c661e8'
default-tabs='css,result' pen-title='bshow multiple layouts with css grid'
preview='true' %}

First, let's examine the markup.

```html
<main class="grid js-grid" data-layout="1">
  <div id="module_1">
    <span>1</span>
  </div>
  <div id="module_2">
    <span>2</span>
  </div>
  <div id="module_3">
    <span>3</span>
  </div>
</main>
```

Just as before, our markup is lean and straightforward, free of any
intent-obscuring layout information. And here's the CSS Grid magic that drives
the multiple layout examples:

```css
@media screen and (min-width: 60rem) {
  /* parent grid settings */
  .grid {
    display: grid;
    align-items: start;
    grid-column-gap: 1rem;
  }

  /* layout 1 styles */
  .grid[data-layout="1"] {
    grid-template: min-content / 15rem 1fr 15rem;
  }

  /* layout 2 styles */
  .grid[data-layout="2"] {
    grid-template: repeat(2, min-content) / 1fr 15rem;
  }

  .grid[data-layout="2"] #module_1 {
    grid-area: 1 / 1 / 2 / 2;
  }

  .grid[data-layout="2"] #module_2 {
    grid-area: 2 / 1 / 3 / 2;
  }

  .grid[data-layout="2"] #module_3 {
    grid-area: 1 / 2 / 3 / 3;
  }

  /* layout 3 styles */
  .grid[data-layout="3"] {
    grid-template: repeat(3, min-content) / 100%;
  }
}
```

Once the screen is larger than our prescribed breakpoint (`60rem`, in this
case), we turn on the grid. Then, in just a few lines of CSS and scoped to the
various `data-layout` options, we can present our content in multiple layouts
without having to touch the markup source. Where possible, we let the browser do
the heavy lifting and place the `#module_`s on its own; otherwise, we use the
`grid-area` property to explicitly place our `#module_`s.

This approach is a marked improvement over the "old" way because it better
separates our concerns, and makes further updates more seamless. Now, instead of
chasing markup templates or crazy `if / else if / else` statements all over our
content, we can capture layout information alongside the rest of our
org- or user-specific presentation styles, where it belongs.
