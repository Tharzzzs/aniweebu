'use client';

import React from 'react';
import ReactPlayer from 'react-player';

export function VideoPlayer() {
  return (
    <ReactPlayer
      url="https://g4fv.biananset.net/_v7/97d61118206bb19859ccff8dd2317be358178cb002a5091e5d385ab79512acae03a3ffb61b6f980b3654d6686c6aef47a52e289f1e349cbd48f0ed79b2d7e760ce10831fcab5dd28a4fbf45427ada27e3c0278fa952eef7f2a885989b608f9fede998efa566c72080be8ea62888ea0b583748e83dc85050d5424ce3e7cc5054d/master.m3u8"
      controls
      width="100%"
      height="100%"
    />
  );
}
