import { hsv2rgb, rgb2hsv } from './utils';

const complement = (rgb) => {
   let hsv = rgb2hsv(rgb);
   hsv.h += 180.0;
   while (hsv.h >= 360.0) hsv.h -= 360.0;
   while (hsv.h < 0.0) hsv.h += 360.0;
   return hsv2rgb(hsv);
};

const splitComplement = (rgb) => {
   let hsv1 = rgb2hsv(rgb);
   let hsv2 = rgb2hsv(rgb);

   hsv1.h += 150.0;
   while (hsv1.h >= 360.0) hsv1.h -= 360.0;
   while (hsv1.h < 0.0) hsv1.h += 360.0;

   hsv2.h += 210.0;
   while (hsv2.h >= 360.0) hsv2.h -= 360.0;
   while (hsv2.h < 0.0) hsv2.h += 360.0;

   return { a: hsv2rgb(hsv1), b: hsv2rgb(hsv2) };
};

const analogous = (rgb) => {
   let hsv1 = rgb2hsv(rgb);
   let hsv2 = rgb2hsv(rgb);

   hsv1.h += 30.0;
   while (hsv1.h >= 360.0) hsv1.h -= 360.0;
   while (hsv1.h < 0.0) hsv1.h += 360.0;

   hsv2.h += 60.0;
   while (hsv2.h >= 360.0) hsv2.h -= 360.0;
   while (hsv2.h < 0.0) hsv2.h += 360.0;

   return { a: hsv2rgb(hsv1), b: hsv2rgb(hsv2) };
};

const triadic = (rgb) => {
   let hsv1 = rgb2hsv(rgb);
   let hsv2 = rgb2hsv(rgb);

   hsv1.h += 120.0;
   while (hsv1.h >= 360.0) hsv1.h -= 360.0;
   while (hsv1.h < 0.0) hsv1.h += 360.0;

   hsv2.h += 240.0;
   while (hsv2.h >= 360.0) hsv2.h -= 360.0;
   while (hsv2.h < 0.0) hsv2.h += 360.0;

   return { a: hsv2rgb(hsv1), b: hsv2rgb(hsv2) };
};

const tetradic = (rgb) => {
   let hsv1 = rgb2hsv(rgb);
   let hsv2 = rgb2hsv(rgb);
   let hsv3 = rgb2hsv(rgb);

   hsv1.h += 90.0;
   while (hsv1.h >= 360.0) hsv1.h -= 360.0;
   while (hsv1.h < 0.0) hsv1.h += 360.0;

   hsv2.h += 180.0;
   while (hsv2.h >= 360.0) hsv2.h -= 360.0;
   while (hsv2.h < 0.0) hsv2.h += 360.0;

   hsv3.h += 270.0;
   while (hsv3.h >= 360.0) hsv3.h -= 360.0;
   while (hsv3.h < 0.0) hsv3.h += 360.0;

   return { a: hsv2rgb(hsv1), b: hsv2rgb(hsv2), c: hsv2rgb(hsv3) };
};

export { complement, splitComplement, analogous, triadic, tetradic };
