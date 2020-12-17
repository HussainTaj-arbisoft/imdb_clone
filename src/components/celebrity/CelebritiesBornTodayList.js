import React, { Component } from "react";
import { connect } from "react-redux";

import SwiperCore, { Navigation, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

import "../layout/css/swiperCustomizations.scss";
import StatusBasedComponent from "../layout/StatusBasedComponent";
import * as celebrityActions from "./../../store/actions/celebrityActions";

import CelebrityCard from "./CelebrityCard";

SwiperCore.use([Navigation, A11y]);

class CelebritiesBornTodayList extends Component {
  state = {
    celebrities: [],
  };

  componentDidMount() {
    this.props.listCelebritiesBornToday();
  }

  render() {
    let content;
    if (this.props.celebrities && this.props.celebrities.length > 0) {
      content = (
        <Swiper
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          spaceBetween={20}
          slidesPerView={"auto"}
        >
          {this.props.celebrities.map((celebrity) => (
            <SwiperSlide key={celebrity.id} style={{ width: "200px" }}>
              <CelebrityCard
                name={celebrity.first_name + " " + celebrity.last_name}
                age={
                  new Date().getFullYear() -
                  new Date(celebrity.date_of_birth).getFullYear()
                }
                imageUrl={celebrity.image}
              />
            </SwiperSlide>
          ))}
          <span className="swiper-button-next"></span>
          <span className="swiper-button-prev"></span>
        </Swiper>
      );
    } else {
      content = <p>Nothing to show.</p>;
    }
    return (
      <div className="py-4 text-left">
        <h1 className="text-left text-primary">Celebrities Born Today</h1>
        <StatusBasedComponent
          status={this.props.status}
          statusCode={this.props.statusCode}
          statusText={this.props.statusText}
          errorMessage={this.props.errorMessage}
          loadingText={"Loading..."}
          className="text-light"
        >
          {content}
        </StatusBasedComponent>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.celebrities.bornToday,
  };
};

const celebritiesBornTodayListActions = {
  listCelebritiesBornToday: celebrityActions.listCelebritiesBornToday,
};

export default connect(
  mapStateToProps,
  celebritiesBornTodayListActions
)(CelebritiesBornTodayList);
