# jquery carousel

A very simple carousel. Just it.

### Installation

Insllation available via [bower].

```
$ bower install jquery.carousel --save
```

### Usage

First, you will need a little boilerplate HTML. It's important to note that jquery.carousel do not include styles. You will need to style.

```html
<div class="js-carousel-container">
	<!-- button for left nav -->
    <button type="button" class="js-carousel-btn-left"></button>
	
	<!-- this div must have your  -->
    <div class="js-carousel-inner">
        <ul>
            <li><h3>Your content</h3></li>
            <li><h3>Your content</h3></li>
            <li><h3>Your content</h3></li>
            <li><h3>Your content</h3></li>
            <li><h3>Your content</h3></li>
            <li><h3>Your content</h3></li>
            <li><h3>Your content</h3></li>
            <li><h3>Your content</h3></li>
        </ul><!-- .team-list -->
    </div><!-- .team-list-inner -->

    <button type="button" class="js-carousel-btn-right"></button>
</div><!-- .team-container -->
```

Some things to note:

* The **js-** classes are mandatory.
* The `inner` block must have the width you wish to be visible;

After that, you just need to instanciate the plugin:

```js
$('.js-carousel-container').carousel({
    show: 3,   // the number of elements that are visible 
    speed: 500 // the speed of the transition
});

### License

See the [License](https://github.com/EscapeWork/laravel-asset-versioning/blob/master/LICENSE) file.