"use client";

import useSound from "use-sound";
import { useEffect, useState } from "react";
import { Image, Slider } from "@nextui-org/react";
import usePlayer from "./PlayerUtils/usePlayer";
import { IoPause, IoPlay } from "react-icons/io5";
import { RiSlowDownFill, RiSpeedUpFill } from "react-icons/ri";
import {
  LuSkipBack,
  LuSkipForward,
  LuVolume2,
  LuVolumeX,
} from "react-icons/lu";
import LikeButton from "../Button/LikeButton";
import { formatTime } from "@/utils/useTime";
import toast from "react-hot-toast";
import { useImageLoader } from "@/utils/useSongMeta";
import { MdDevices, MdHeadset, MdShare } from "react-icons/md";
import { PiQueue } from "react-icons/pi";
import urls from "@/URL";
import { useRouter } from "next/navigation";
import ToolTip from "../Button/ToolTip";
import { fetchURL } from "@/utils/useAPI";
import { TbClockStop } from "react-icons/tb";

const makeIcon = (Icon, func, text) => (
  <ToolTip text={text}>
    <Icon
      className="text-xl 2xl:text-2xl cursor-pointer hover:text-white"
      onClick={func}
    />
  </ToolTip>
);

const Player = ({ song, URL }) => {
  const router = useRouter();
  const image = useImageLoader(song);
  const { ids, activeID, setID, reset } = usePlayer();

  const [volume, setVolume] = useState(1);
  const [speed, setSpeed] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timer, setTimer] = useState("0:00");
  const [device, setDevice] = useState(undefined);

  const [play, { pause, sound, duration }] = useSound(URL, {
    volume: volume,
    format: ["mp3"],
    playbackRate: speed,
    onplay: () => setPlaying(true),
    onpause: () => setPlaying(false),
    onend: () => {
      setPlaying(false);
      onNext();
    },
  });

  const onNext = () => {
    const curr = ids.findIndex(id => id === activeID);
    const next = ids[curr + 1];
    setID(next || ids[0]);
  };

  const onPrev = () => {
    const curr = ids.findIndex(id => id === activeID);
    const prev = ids[curr - 1];
    setID(prev || ids[ids.length - 1]);
  };

  const onSlow = () => {
    const newSpeed = Math.max(speed - 0.1, 0.5);
    if (newSpeed <= 0.5) toast.error("Min Speed Reached");
    else setSpeed(newSpeed);
  };

  const onFast = () => {
    const newSpeed = Math.min(speed + 0.1, 2);
    if (newSpeed >= 2) toast.error("Max Speed Reached");
    else setSpeed(newSpeed);
  };

  setInterval(() => setProgress(Math.round(sound?.seek())), 500);

  const toggleMute = () => setVolume(volume ? 0 : 1);
  const togglePlay = () => (playing ? pause() : play());
  const onMore = () => router.push(`${urls.SONG}/${song.id}`);
  const onQueue = () => router.push(`${urls.QUEUE}/${ids.join("+")}`);
  const onShare = () => {
    navigator.clipboard.writeText(`${fetchURL()}song/${song.id}`);
    toast.success("Song URL Copied");
  };

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent);
    const isTablet = /iPad|Android/i.test(userAgent) && !isMobile;

    setDevice({
      agent: userAgent,
      type: isMobile ? "Mobile" : isTablet ? "Tablet" : "Desktop",
    });
  }, []);

  useEffect(() => {
    sound?.play();
    return () => sound?.unload();
  }, [sound]);

  useEffect(() => {
    setTimer(formatTime(progress));
  }, [progress]);

  return (
    <div className="grid grid-cols-3 h-full w-full p-4">
      <div className="flex w-full justify-start">
        <div className="relative flex items-center justify-center gap-4">
          <Image
            radius="sm"
            src={image || "/placeholder.png"}
            alt={song.label}
            removeWrapper
            className="absolute max-h-[200px] min-w-[18vw] transform -translate-y-[calc(100%+1rem)] -left-4 top-0"
          />
          <div className="flex flex-col">
            <span
              className="text-white text-sm hover:underline cursor-pointer"
              onClick={onMore}
            >
              {song.label}
            </span>
            <span className="text-xs">{song.author}</span>
          </div>
          <LikeButton songID={song.id} show={true} />
          {makeIcon(TbClockStop, reset, "Stop Song")}
        </div>
      </div>

      <div className="w-full h-full flex flex-col items-center justify-center gap-2">
        <div className="flex items-center justify-center gap-4">
          {makeIcon(RiSlowDownFill, onSlow, "Slow Down Song")}
          {makeIcon(LuSkipBack, onPrev, "Previous Song")}
          <div
            onClick={togglePlay}
            className="flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
          >
            {playing ? (
              <IoPause className="text-black text-xl 2xl:text-2xl" />
            ) : (
              <IoPlay className="text-black text-xl 2xl:text-2xl" />
            )}
          </div>
          {makeIcon(LuSkipForward, onNext, "Next Song")}
          {makeIcon(RiSpeedUpFill, onFast, "Speed Up Song")}
        </div>
        <div className="flex items-center justify-center gap-4 w-full">
          <span className="text-sm">{timer}</span>
          <Slider
            size="sm"
            step={0.01}
            minValue={0}
            maxValue={duration / 1000}
            value={progress ?? 0}
            className="w-full"
            onChange={val => {
              setProgress(val);
              sound?.seek(val);
            }}
          />
          <span className="text-sm">{formatTime(duration / 1000)}</span>
        </div>
      </div>

      <div className="flex w-full justify-end items-center gap-2 pr-2">
        {volume
          ? makeIcon(LuVolume2, toggleMute, "Mute")
          : makeIcon(LuVolumeX, toggleMute, "Unmute")}
        <Slider
          size="sm"
          minValue={0}
          maxValue={1}
          step={0.01}
          className="w-full max-w-[100px]"
          value={volume ?? 0}
          onChange={vol => setVolume(vol)}
        />
        {makeIcon(MdHeadset, onMore, "Song Info")}
        {makeIcon(PiQueue, onQueue, "Queue")}
        {makeIcon(
          MdDevices,
          () => {},
          <div className="max-w-[200px]">
            <div className="text-sm font-bold">{device?.type}</div>
            <div className="text-xs">{device?.agent}</div>
            <div className="text-xs mt-2 font-semibold">Song: {song.label}</div>
          </div>,
        )}
        {makeIcon(MdShare, onShare, "Share")}
      </div>
    </div>
  );
};

export default Player;
