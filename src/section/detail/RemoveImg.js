import {useRef} from "react";
import "./RemoveImg.scss";

import chromeFront from "../../assets/img/CHROME_HAVEN_front.png";
import chromeSide from "../../assets/img/CHROME_HAVEN_left.png";
import chromeRight from "../../assets/img/CHROME_HAVEN_right.png"
import chromeTop from "../../assets/img/CHROME_HAVEN_top.png";
import chromeBack from "../../assets/img/CHROME_HAVEN_back.png";
import chrome01 from "../../assets/img/CHROME_HAVEN_01.png";
import chrome02 from "../../assets/img/CHROME_HAVEN_03.png";
import chrome03 from "../../assets/img/CHROME_HAVEN_04.png";
import chrome04 from "../../assets/img/CHROME_HAVEN_05.png";

const detailCuts = [
  { id: "front", base: chromeFront, hover: chrome01, alt: "정면" },
  { id: "side", base: chromeSide, hover: chrome02, alt: "측면" },
  { id: "right", base: chromeRight, hover: chrome03, alt: "우측"},
  { id: "top", base: chromeTop, hover: chrome03, alt: "상단" },
  { id: "back", base: chromeBack, hover: chrome04, alt: "후면" },
];

const RemoveImg = () => {
  const trackRef = useRef(null);

  const state = useRef({
    isDown: false,
    startX: 0,
    startScrollLeft: 0,
    moved: false,
  });
  const onPointerDown = (e) => {
    const el = trackRef.current;
    if (!el) return;
    state.current.isDown = true;
    state.current.moved = false;
    state.current.startX = e.clientX;
    state.current.startScrollLeft = el.scrollLeft;
    el.setPointerCapture?.(e.pointerId);
    el.classList.add("is-dragging");
  };

  const onPointerMove = (e) => {
    const el = trackRef.current;
    if (!el || !state.current.isDown) return;
    const dx = e.clientX - state.current.startX;
    if (Math.abs(dx) > 4) state.current.moved = true;
    el.scrollLeft = state.current.startScrollLeft - dx;
  };

  const endDrag = () => {
    const el = trackRef.current;
    state.current.isDown = false;
    el?.classList.remove("is-dragging");
  };

  // 드래그 했을 때 카드 클릭/드래그 선택 방지용
  const onClickCapture = (e) => {
    if (state.current.moved) {
      e.preventDefault();
      e.stopPropagation();
    }
  };
  return (
    <section className="detail_cut">
      <div className="detail_cut_head">
        <h3 className="detail_cut_title">Detail Cut</h3>
      </div>
      <div className="detail_cut_viewport">
        <div className="detail_cut_track" role="list"
          ref={trackRef} 
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
          onClickCapture={onClickCapture}
          >
          {detailCuts.map((it) => (
            <article className="detail_card" key={it.id} role="listitem">
              <div className="detail_card_media">
                <img className="img_base" src={it.base} alt={it.alt} loading="lazy" />
                <img className="img_hover" src={it.hover} alt="" aria-hidden="true" loading="lazy" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RemoveImg;
