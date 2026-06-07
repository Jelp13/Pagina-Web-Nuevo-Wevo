'use client';

import { useRef, useState } from 'react';

const videos = [
  {
    src: '/Video/Cocheros.mp4',
    user: '@nuevowevo',
    tiktokUrl: 'https://www.tiktok.com/@nuevowevo/video/7646864525857279250',
    profileUrl: 'https://www.tiktok.com/@nuevowevo ',
  },
  {
    src: '/Video/Colabroacion empresa.mp4',
    user: '@menkian',
    tiktokUrl: 'https://www.tiktok.com/@menkian/video/7613862613923024148',
    profileUrl: 'https://www.tiktok.com/@menkian',
  },
  {
    src: '/Video/WhatsApp Video 2026-06-06 at 11.45.53 PM.mp4',
    user: '@nuevowevo',
    tiktokUrl: 'https://www.tiktok.com/@nuevowevo/video/7622375858975624468',
    profileUrl: 'https://www.tiktok.com/@nuevowevo',
  },
];

function VideoCard({ src, user, tiktokUrl, profileUrl }: typeof videos[0]) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function toggle() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  }

  return (
    <div className="flex flex-col rounded-2xl overflow-hidden border border-cyan-400/10 bg-white/5 shadow-lg w-full max-w-[325px]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-cyan-400/10">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-cyan-300/20 flex items-center justify-center text-cyan-300 font-bold text-sm">
            NW
          </div>
          <div>
            <p className="text-white text-sm font-semibold leading-tight">{user}</p>
            <p className="text-slate-400 text-xs">Audio original</p>
          </div>
        </div>
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-cyan-300/15 px-3 py-1.5 text-xs font-semibold text-cyan-300 hover:bg-cyan-300/25 transition-colors"
        >
          Ver perfil
        </a>
      </div>

      {/* Video */}
      <div className="relative bg-black cursor-pointer" onClick={toggle}>
        <video
          ref={videoRef}
          src={src}
          className="w-full object-cover"
          style={{ aspectRatio: '9/16' }}
          playsInline
          onEnded={() => setPlaying(false)}
        />
        {!playing && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-14 w-14 rounded-full bg-black/50 flex items-center justify-center backdrop-blur-sm">
              <svg className="h-6 w-6 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 flex flex-col gap-3 border-t border-cyan-400/10">
        <a
          href={tiktokUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-300 text-sm hover:text-cyan-200 transition-colors"
        >
          Ver más en TikTok →
        </a>
        <div className="flex items-center gap-5">
          <a href={tiktokUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-slate-400 hover:text-rose-400 transition-colors">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span className="text-xs">Me gusta</span>
          </a>
          <a href={tiktokUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-300 transition-colors">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span className="text-xs">Comentar</span>
          </a>
          <a href={tiktokUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-300 transition-colors ml-auto">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function TikTokSection() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 py-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {videos.map((v) => (
          <VideoCard key={v.src} {...v} />
        ))}
      </div>
    </section>
  );
}
