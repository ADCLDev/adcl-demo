import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./GoogleMap'), {
  ssr: false, // Disable server-side rendering for this component
});

export default Map;
