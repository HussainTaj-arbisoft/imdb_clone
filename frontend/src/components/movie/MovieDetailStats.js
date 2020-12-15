import React from 'react'
import parseTuple from '../../utilities/tuple'

export default function MovieDetailStats(props) {
    let movie = props.movie;
    if (!movie)
        return <span>No Data Provided.</span>;

    let release_date = new Date(movie.release_date);
    let release_date_str = (release_date.getFullYear() + "-" +
        release_date.getMonth() + "-" + release_date.getDate());
    return (
        <div className="card bg-dark p-2 my-4 text-light">
            <table>
                <tbody>
                    <tr>
                        <th className="text-primary">Rating</th>
                        <td>{parseTuple(movie.rating)[1]}</td>
                        <th></th>
                        <td>
                            <span className="fa fa-star text-primary mr-1"></span>
                            {movie.average_user_rating}
                        </td>
                    </tr>
                    <tr>
                        <th className="text-primary">Release Date</th>
                        <td>{release_date_str}</td>
                        <th></th>
                        <td>
                            <span className="fa fa-line-chart text-primary mr-1"></span>
                            {movie.popularity}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
