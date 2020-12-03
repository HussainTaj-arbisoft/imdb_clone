import React, { Component } from 'react';
import ReactPlayer from 'react-player/file';
import Header from '../layout/Header';

export default class MovieDetail extends Component {
    render() {
        console.log(this.props);
        return (
            <div>
                <Header />
                <div className="container text-light">
                    <div className="row">
                        <div className="col-lg-8 col-md-12 p-0">
                            <ReactPlayer
                                url="https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_640_3MG.mp4"
                                controls={true}
                                className="w-100 h-100"
                            />
                        </div>
                        <div className="col-lg-4 col-md-12 bg-dark">
                            <div className="d-flex m-2">
                                <img src='https://upload.wikimedia.org/wikipedia/en/0/0e/The_Boss_Baby_poster.jpg'
                                    alt="poster"
                                    width="100"
                                />
                                <div className="p-2">
                                    <p className="font-weight-bold">Title</p>
                                    <p className="text-secondary">asd as das da sd asd as d</p>
                                </div>
                            </div>
                            <hr style={{ backgroundColor: "#333" }} />
                            <div>
                                <h2> Trailer </h2>
                                <p>
                                    lorem ispim lorem ispimlorem ispimlorem ispimlorem ispimlorem ispimlorem ispimlorem ispimlorem ispimlorem ispimlorem ispimlorem ispimlorem ispimlorem ispimlorem ispimlorem ispimlorem ispimlorem ispimlorem ispimlorem ispimlorem ispimlorem ispimlorem ispimlorem ispimlorem ispimlorem ispimlorem ispimlorem ispimlorem ispimlorem ispimlorem ispimlorem ispimlorem ispimlorem ispimlorem ispimlorem ispimlorem ispim
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
