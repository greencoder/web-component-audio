# web-component-audio

A vanilla JS implementation of a HTML audio player using a custom web component.

## Background

I recently needed to have a HTML audio player that had buttons to skip forward and back in time. The standard `<audio>` tag doesn't do this, so it was a great excuse to learn how to write web components.

## Usage

First, include a script tag in your HTML:
```
<script type="module" src="audio-player.js"></script>
```

Note: You *must* use `type="module"` in your `<script>` tag or it will not render.

Next, use the web component in your HTML:
```
<body>
  <audio-player src="sample.mp3" type="audio/mpeg"></audio-player>
</body>
```

## Screenshot

<img width="580" alt="Screen Shot 2021-03-15 at 12 31 15 PM" src="https://user-images.githubusercontent.com/239861/111203765-01ad1200-858b-11eb-867c-3c527766ba9d.png">

## Feedback

If you have any feedback, bug fixes, or enhancements, please create a PR.
