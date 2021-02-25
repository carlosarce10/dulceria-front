<template>
  <Particles
    id="tsparticles"
    :options="{
      background: {
        color: {
          value: '#ffffff',
        },
      },
      fpsLimit: 60,
      interactivity: {
        detectsOn: 'canvas',
        events: {
          onHover: {
            enable: true,
          },
        },
        modes: {
          bubble: {
            distance: 100,
            duration: 10,
            opacity: 0.8,
            size: 10,
          },
          push: {
            quantity: 4,
          },
        },
      },
      particles: {
        color: {
          value: '#64B5F6',
        },
        links: {
          color: '#64B5F6',
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        collisions: {
          enable: true,
        },
        move: {
          direction: 'none',
          enable: true,
          outMode: 'bounce',
          random: false,
          speed: 3,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            value_area: 800,
          },
          value: 80,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: 'circle',
        },
        size: {
          random: true,
          value: 5,
        },
      },
      detectRetina: true,
    }"
  />
</template>

<style>
canvas {
  display: block;
  background: rgb(33, 36, 50);
  position: fixed;
  z-index: -1;
  left: 0;
  top: 0;
}
</style>
