import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShowTimeOfFilmAction } from "../../../redux/actions/CinemaAction";
import { getListFilmsAction } from "../../../redux/actions/FilmMangeAction";
import { GET_LIST_PHIM_DC, GET_LIST_PHIM_SC, HIDE_LOADING, SHOW_LOADING } from "../../../redux/types/Type";
import CarouselFilms from "./CarouselFilms";
import CinemaInfor from "./CinemaInfor";
import './HomeMenu.scss';

export default function HomeMenu() {

  const dispatch = useDispatch();
  let { listFilms } = useSelector(state => state.FilmManageReducer)
  let { listCinemaDetail } = useSelector(state => state.CinemaReducer);

  const handleOnclick = (e) => {
    // Change tab active
    document.querySelectorAll('.actived')[0]?.classList.remove('actived');
    e.target.classList.add('actived');

    // Dispatch action to get list film
    [...e.target.classList].includes('phimDC') ? dispatch({ type: GET_LIST_PHIM_DC }) : dispatch({ type: GET_LIST_PHIM_SC })
    dispatch({ type: SHOW_LOADING })
    setTimeout(() => {
      dispatch({ type: HIDE_LOADING })
    }, 300);
  }

  useEffect(() => {
    dispatch(getListFilmsAction());
    dispatch(getShowTimeOfFilmAction());

  }, [])

  return <div className="bk-home-menu my-10">
    <div className="bk-menu-btn flex justify-center items-center mb-10">
      <button className="phimDC actived" onClick={handleOnclick}>Đang chiếu</button>
      <button className="phimSC" onClick={handleOnclick}>Sắp chiếu</button>
    </div>
    {/* Handle carousel list films */}
    <CarouselFilms listFilms={listFilms}/>
    {/* Handle list cinema */}
    <CinemaInfor listCinemaDetail={listCinemaDetail} />
  </div>;
}
