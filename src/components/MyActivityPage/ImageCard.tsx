import Image from 'next/image';
import { MouseEventHandler } from 'react';

import RedXButtonIcon from '@/assets/icons/icon_x_red.svg';

interface ImageProps {
  image: File;
  onClickDelete: (file: File) => void;
}

/* NOTE: 이미지를 확인/제거할 수 있는 컴포넌트
 * onClickDelete: 프리뷰와 실제 폼에 입력 변화를 반영하기 위한 함수
 */
export default function ImageCard({ image, onClickDelete }: ImageProps) {
  const handleDeleteImage: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    onClickDelete(image);
  };

  return (
    <div className="size-my-act-img relative">
      <Image
        src={URL.createObjectURL(image)}
        alt="이미지"
        fill
        className="rounded-2xl object-cover"
      />
      {/* 이미지 삭제 버튼 */}
      <button
        className="pc:height-40 absolute bottom-[155px] left-[155px] z-10 size-6 opacity-80 hover:opacity-90 active:opacity-100 pc:left-40 pc:size-10 tablet:bottom-[190px] tablet:left-[190px] tablet:size-8"
        type="button"
        onClick={handleDeleteImage}
      >
        {/* <Image
          src="/assets/icons/icon_x_red.svg"
          alt="이미지 삭제"
          fill
          className="rounded-full"
        /> */}
        <RedXButtonIcon width={'100%'} height={'100%'} />
      </button>
    </div>
  );
}
