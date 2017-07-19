---
layout: post
title: "Baby Steps"
---

Owen has officially been walking for two whole months.

Here's a picture from my [Instagram](https://www.instagram.com/bobbyshowalter)
of his first steps:

<blockquote class="instagram-media" data-instgrm-version="7" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:8px;"> <div style=" background:#F8F8F8; line-height:0; margin-top:40px; padding:50.0% 0; text-align:center; width:100%;"> <div style=" background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAMUExURczMzPf399fX1+bm5mzY9AMAAADiSURBVDjLvZXbEsMgCES5/P8/t9FuRVCRmU73JWlzosgSIIZURCjo/ad+EQJJB4Hv8BFt+IDpQoCx1wjOSBFhh2XssxEIYn3ulI/6MNReE07UIWJEv8UEOWDS88LY97kqyTliJKKtuYBbruAyVh5wOHiXmpi5we58Ek028czwyuQdLKPG1Bkb4NnM+VeAnfHqn1k4+GPT6uGQcvu2h2OVuIf/gWUFyy8OWEpdyZSa3aVCqpVoVvzZZ2VTnn2wU8qzVjDDetO90GSy9mVLqtgYSy231MxrY6I2gGqjrTY0L8fxCxfCBbhWrsYYAAAAAElFTkSuQmCC); display:block; height:44px; margin:0 auto -44px; position:relative; top:-22px; width:44px;"></div></div><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/p/BUNjd-LBBVo/" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by Bobby Showalter (@bobbyshowalter)</a> on <time style=" font-family:Arial,sans-serif; font-size:14px; line-height:17px;" datetime="2017-05-17T23:24:11+00:00">May 17, 2017 at 4:24pm PDT</time></p></div></blockquote>
<script async defer src="//platform.instagram.com/en_US/embeds.js"></script>

Watching him learn to walk these past two months has been incredible. It amazes
me that no matter how many times he falls over, he never gets discouraged. No
amount of tripping over our yorkie, or knocking his head on the end tables,
slows him down. He's always ready for more.

* * *

I've been trying to learn javascript for a long time. I've read "definitive
learning guides," I've read books, and I've taken some Codecademy-style online
courses. It never stuck.

Part of the problem is my learning style. The impracticality of most tutorials
is frustrating. It's hard to get excited about learning a new skill when you
spend ages `foo`ing your `bar` at a `baz`. There's no reward, no payoff, and the
ramp-up from those trite examples to more real-world stuff is often jarring.

A better approach, then, is to identify a simple real-world problem, and solve
it. Owen didn't watch tutorial videos about the foundations of movement before
he started walking, he just&hellip;did it. Poorly at first, granted, but he did
it.

* * *

My baby steps started with [Wes Bos](https://wesbos.com). He has a neat course
called [JavaScript 30](https://javascript30.com/) that helps you "build 30
things in 30 days with 30 tutorials." The beauty of this course, for me, is that
it didn't waste time laboring over beginner concepts. Instead, you're
immediately tasked with *making something.* You might not understand it right
away, but you're doing it. Then, before you know it, you have a few nicely
varied gizmos you can play with&mdash;that *you* made!

Wes' course really got my gears turning, and allowed me to get past the mental
block of "yeah, but *how*?!" The things I've done with javascript since taking
his course aren't award-winning by any means, but it's enough to allow me to
start adding those extra bits of functionality I was missing.

* * *

I got to use these newfound skills recently in a side project. In this project
is a simple form that asks you to identify the "type" of something from two
choices (there will eventually be more than two choices). The markup is
straightforward radio-button stuff, and I'm doing a little CSS trickery to
switch out the actual radio controls for fancy pictures.

It all works, except when you try to submit the form without selecting a "type."
We're using [Devise](https://github.com/plataformatec/devise) to validate form
data; when it detects errors, it wraps those fields in a `<div
class="field-with-errors">` for a styling hook. No big deal, except that extra
`<div>` broke my CSS selector so that when you tried to pick a "type" to fix the
form error, you couldn't actually tell which one was selected.

CSS doesn't have the tools to assist with this edge-case, unfortunately, so I
had to turn to javascript. Here's what I came up with:

```javascript
// handle 'selected' and 'error' states for type radios
$(document).on('turbolinks:load', function() {
    const typeRadios = document.querySelectorAll('.js-type-radios input[type="radio"]');
    const typeLabels = document.querySelectorAll('.js-type-radios label');

    function handleTypeChange(e) {
        // Radio buttons don't fire an 'unchecked' event, so...
        typeLabels.forEach(label => {
            // ...we first remove the `.is-selected` class from all
            // type labels...
            label.classList.remove('is-selected');
        });

        if (this.checked) {
            let relatedLabel = document.querySelector(`label[for="${this.id}"]`);
            // ...then apply it only to the one that was selected.
            relatedLabel.classList.add('is-selected');
        }
    }

    typeRadios.forEach(radio => radio.addEventListener('change', handleTypeChange));
});
```

In short:

- Grab all the "type" radio buttons and labels
- Attach a "change" listener to the radio buttons
- When a radio button fires a "change" event:
  - Remove `.is-selected` from all the labels
  - Add `.is-selected` to only the label of the selected radio button

This freed me from complicated CSS selectors, allowing me to style the form
more sanely *and* account for the error state. It's also future-proof for when
we inevitably add more "types." Huzzah!

Could it be done better? Almost certainly. But the important thing is: *I did
it.* I wrote some functioning javascript to solve a problem. I couldn't do that
a couple of months ago.

**Baby steps.**
