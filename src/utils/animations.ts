import gsap from "gsap";

/**
 * Animates elements with GSAP timeline
 * @param tl - GSAP timeline instance
 * @param rotationRef - Reference to the object with rotation property
 * @param rotationState - Target Y rotation value
 * @param p0 - First parameter (unused in current implementation)
 * @param p1 - Second parameter (unused in current implementation)
 * @param p2 - Animation configuration object
 */
export const animateWithGsapTimeline = (
  tl: gsap.core.Timeline,
  rotationRef: { current: { rotation: { y: number } } },
  rotationState: number,
  p0: string,
  p1: string,
  p2: { transform: string; duration: number }
): void => {
  // Animate the rotation
  tl.to(rotationRef.current.rotation, {
    y: rotationState,
    duration: 1,
    ease: 'power2.inOut'
  });

  // Select DOM elements for animation
  const firstModel = document.querySelector(p0) as gsap.TweenTarget;
  const secondModel = document.querySelector(p1) as gsap.TweenTarget;

  // Slide out the first model
  tl.to(
    firstModel,
    {
      x: p2.transform,
      duration: p2.duration,
      ease: 'power2.inOut',
      opacity: 0
    },
    '<'
  );

  // Slide in the second model
  tl.fromTo(
    secondModel,
    { x: `-${p2.transform}`, opacity: 0 },
    {
      x: '0%',
      duration: p2.duration,
      ease: 'power2.inOut',
      opacity: 1
    },
    '<'
  );
};


export function animateWithGsap(
  target: gsap.TweenTarget,
  animationProps: gsap.TweenVars,
  scrollProps: gsap.plugins.ScrollTriggerInstanceVars
): void {
  gsap.to(target, {
    ...animationProps,
    scrollTrigger: {
      trigger: target as gsap.DOMTarget,
      toggleActions: 'restart reverse restart reverse',
      start: 'top 85%',
      ...scrollProps,
    },
  });
}