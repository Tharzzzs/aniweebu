// src/global.d.ts
declare namespace JSX {
    interface IntrinsicElements {
      'media-controller': React.DetailedHTMLProps<React.HTMLProps<HTMLElement>, HTMLElement>;
      'media-control-bar': React.DetailedHTMLProps<React.HTMLProps<HTMLElement>, HTMLElement>;
      'media-play-button': React.DetailedHTMLProps<React.HTMLProps<HTMLElement>, HTMLElement>;
      'media-mute-button': React.DetailedHTMLProps<React.HTMLProps<HTMLElement>, HTMLElement>;
      'media-volume-range': React.DetailedHTMLProps<React.HTMLProps<HTMLElement>, HTMLElement>;
      'media-time-range': React.DetailedHTMLProps<React.HTMLProps<HTMLElement>, HTMLElement>;
      'media-pip-button': React.DetailedHTMLProps<React.HTMLProps<HTMLElement>, HTMLElement>;
      'media-fullscreen-button': React.DetailedHTMLProps<React.HTMLProps<HTMLElement>, HTMLElement>;
    }
  }
  