import MyOrbitImage from '../../resources/MyOrbit.webp';

export type ProjectMedia = {
  type: 'image' | 'video';
  src: string;
};

export const projectMedia: Record<string, ProjectMedia> = {
  myorbit: {
    type: 'image',
    src: MyOrbitImage,
  },
  spoonsaver: {
    type: 'video',
    src: 'https://www.youtube.com/embed/j5DjjKh6PqY?rel=0&modestbranding=1',
  },
};
