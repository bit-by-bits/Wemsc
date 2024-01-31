"use client";

import useSound from "use-sound";
import { useEffect, useState } from "react";
import { HiOutlineSpeakerWave, HiOutlineSpeakerXMark } from "react-icons/hi2";
import { Image, Slider } from "@nextui-org/react";
import usePlayer from "./PlayerUtils/usePlayer";
import { IoPause, IoPlay } from "react-icons/io5";
import { RiSlowDownFill, RiSpeedUpFill } from "react-icons/ri";
import { LuSkipBack, LuSkipForward } from "react-icons/lu";
import LikeButton from "../Button/LikeButton";
import { formatTime } from "@/utils/useTime";
import toast from "react-hot-toast";
import { useImageLoader } from "@/utils/useSongMeta";

const Player = ({ song, URL }) => {
  const { ids, activeID, setID } = usePlayer();
  const image = useImageLoader(song) || "/placeholder.png";

  const [volume, setVolume] = useState(1);
  const [speed, setSpeed] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timer, setTimer] = useState("0:00");

  const PlayIcon = playing ? IoPause : IoPlay;
  const VolumeIcon = volume ? HiOutlineSpeakerWave : HiOutlineSpeakerXMark;
  const IconClass = "text-xl 2xl:text-2xl cursor-pointer hover:text-white";

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

  const toggleMute = () => setVolume(volume ? 0 : 1);
  const togglePlay = () => (playing ? pause() : play());
  setInterval(() => setProgress(Math.round(sound?.seek())), 99);

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
    if (newSpeed < 0.5) {
      toast.error("Minimum speed reached");
      return;
    }

    setSpeed(newSpeed);
    sound?.setPlaybackRate(newSpeed);
  };

  const onFast = () => {
    const newSpeed = Math.min(speed + 0.1, 2);
    if (newSpeed > 2) {
      toast.error("Maximum speed reached");
      return;
    }

    setSpeed(newSpeed);
    sound?.setPlaybackRate(newSpeed);
  };

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
            src={image}
            alt={song.label}
            removeWrapper
            className="absolute max-h-[200px] min-w-[18vw] transform -translate-y-[calc(100%+1rem)] -left-4 top-0"
          />
          <div className="flex flex-col">
            <span className="text-white text-sm">{song.label}</span>
            <span className="text-xs">{song.author}</span>
          </div>
          <LikeButton songID={song.id} show={true} />
        </div>
      </div>

      <div className="w-full h-full flex flex-col items-center justify-center gap-2">
        <div className="flex items-center justify-center gap-4">
          <RiSlowDownFill className={IconClass} onClick={onSlow} />
          <LuSkipBack className={IconClass} onClick={onPrev} />
          <div
            onClick={togglePlay}
            className="flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
          >
            <PlayIcon className="text-black text-xl 2xl:text-2xl" />
          </div>
          <LuSkipForward className={IconClass} onClick={onNext} />
          <RiSpeedUpFill className={IconClass} onClick={onFast} />
        </div>
        <div className="flex items-center justify-center gap-4">
          <span className="text-sm">{timer}</span>
          <Slider
            size="sm"
            step={0.01}
            minValue={0}
            maxValue={duration / 1000}
            value={progress}
            className="min-w-[40vw]"
            onChange={val => {
              setProgress(val);
              sound?.seek(val);
            }}
          />
          <span className="text-sm">{formatTime(duration / 1000)}</span>
        </div>
      </div>

      <div className="flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={toggleMute}
            className="text-2xl cursor-pointer hover:text-white"
          />
          <Slider
            size="sm"
            minValue={0}
            maxValue={1}
            step={0.01}
            value={volume}
            onChange={vol => setVolume(vol)}
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
