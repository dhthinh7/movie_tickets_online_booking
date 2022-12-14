import { Button, DatePicker, Form, InputNumber, Select } from "antd";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInforCinemaAction, getInforGroupOfCinemaAction } from "../../../redux/actions/CinemaAction";
import moment from 'moment';
import { taoLichChieuAction } from "../../../redux/actions/BookingTicketActions";
import './ShowTime.scss';

export default function ShowTime(props) {
  
  let film = {};
  const dispatch = useDispatch();

  let { listCinema } = useSelector(state => state.CinemaReducer);
  let { groupOfCinema } = useSelector(state => state.CinemaReducer);

  useEffect(()=>{
    dispatch(getInforCinemaAction());
  }, [])

  if (localStorage.getItem('filmParams')) {
    film = JSON.parse(localStorage.getItem('filmParams'));
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: props.match.params.id,
      ngayChieuGioChieu: '',
      maRap: '',
      giaVe: ''
    },
    onSubmit: (values) => {
      dispatch(taoLichChieuAction(values));
    }
  })

  // Create option to choose HTR
  const convertSelectHTR = () => {
    return listCinema.map((item) => {
      return {label: item.tenHeThongRap, value: item.maHeThongRap}
    })
  }

  
  const handleChangeHeThongRap = (value) => {
    dispatch(getInforGroupOfCinemaAction(value));
  }
  
  const handleChangeCumRapOptions = () => {
    return groupOfCinema.length && groupOfCinema.map((item) => {
      return {label: item.tenCumRap, value: item.maCumRap}
    })
  }
  
  const handleChangeCumRap = (value) => {
    formik.setFieldValue('maRap', value);
  }
  
  const onChangeDate = (value) => {
    formik.setFieldValue('ngayChieuGioChieu', moment(value).format('DD/MM/YYYY hh:mm:ss'))
  }

  const onchangeInputNumber = (value) => {
    formik.setFieldValue('giaVe', value)
  }

  return (
    <div className="bk-showtime flex justify-around">
      <div className="showtime-image">
        <h3 className="showtime-image--title text-2xl">T???o l???ch chi???u - {props.match.params.name}</h3>
        <img src={film.hinhAnh} alt='...' width={200} height={100}/>
      </div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onSubmitCapture={formik.handleSubmit}
        style={{maxWidth: '50%', flex: '0 0 50%'}}
        className="showtime-form"
      >
        <Form.Item label="H??? th???ng r???p">
          <Select options={convertSelectHTR()} onChange={handleChangeHeThongRap} placeholder="Ch???n h??? th???ng r???p" />
        </Form.Item>
        <Form.Item label="C???m r???p">
          <Select options={handleChangeCumRapOptions()} onChange={handleChangeCumRap} placeholder="Ch???n c???m r???p" />
        </Form.Item>
        <Form.Item label="Ng??y chi???u gi??? chi???u">
          <DatePicker format="DD/MM/YYYY hh:mm:ss" showTime onChange={onChangeDate}/>
        </Form.Item>
        <Form.Item label="Gi?? v??">
          <InputNumber step={1000} onChange={onchangeInputNumber} />
        </Form.Item>
        <Form.Item label="Ch???c n??ng">
          <Button htmlType="submit">T???o l???ch chi???u</Button>
        </Form.Item>
      </Form>
    </div>
  )
}
