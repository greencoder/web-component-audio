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


## Feedback

If you have any feedback, bug fixes, or enhancements, please create a PR.