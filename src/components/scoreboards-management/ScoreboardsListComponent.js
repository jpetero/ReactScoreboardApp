import React, { Component } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import moment from 'moment';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';
import config from '../../config/config';
import { connect } from 'react-redux';
import { fetchScoreboards } from '../../redux/scoreboards/actions/fetchScoreboardsActions';
import DeleteButtonComponent from './DeleteButtonComponent';

export class ScoreboardsListComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      number: 5,
    };
  }

  // Allows the the tablle to be exported as a PDF
  exportToPdf = () => {
    const allRows = document.getElementById('ascoreboards').rows;
    for (let i = 0; i < allRows.length; i++) {
      allRows[i].deleteCell(-1);
    }
    const input = document.getElementById('ascoreboards');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      const doc = new jsPDF('p', 'mm');
      let position = 0;
      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      doc.save('scoreboards.pdf');
    });
  };

  // Toggle status of the the approval
  onChangeApproval = async (id) => {
    // console.log(id);
    await axios.put(`${config.baseUrl}/scoreboards/approval/${id}`);
    await this.props.fetchScoreboards(this.props.match.params.id);
  };

  // Wipe the scoreboard out of memory
  deleteScoreboard = async (id) => {
    await axios.delete(`${config.baseUrl}/scoreboards/${id}`);
    this.props.fetchScoreboards(this.props.match.params.id);
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  componentDidMount() {
    this.props.fetchScoreboards(this.props.match.params.id);
  }

  render() {
    // Retrieve the current logged in user department
    const { scoreboards, isLoading } = this.props.scoreboardsData;
    // console.log(scoreboards);

    if (isLoading) {
      return <div className="spinner-border mt-3"></div>;
    }

    if (isEmpty(scoreboards)) {
      return (
        <div>
          {' '}
          <h3 className="mt-3 text-info">No scoreboard</h3>
        </div>
      );
    }

    const number = this.state.number === 'all' ? 100000 : this.state.number;

    const clonedDepartmentScoreboards = cloneDeep(
      isArray(scoreboards) ? scoreboards.slice(0, number) : null
    );

    // Calculating cummulatibe average
    let averageScoresList = [];

    // Push al the average score
    if (clonedDepartmentScoreboards !== null)
      clonedDepartmentScoreboards.forEach((scoreboard, index) => {
        // Calculating average scores
        let totalWeights = 0;

        scoreboard.kpis.forEach((kpi) => {
          totalWeights += kpi.kPIScoreBoard.KPIWeight;
        });

        let averageScore = 0;

        for (let i = 0; i < scoreboard.kpis.length; i++) {
          const kpi = scoreboard.kpis[i];
          const score =
            (kpi.kPIScoreBoard.KPIScore * kpi.kPIScoreBoard.KPIWeight) /
            totalWeights;
          averageScore += score;
        }

        averageScoresList.push(averageScore);
      });

    // Create the page
    const departmentScoreboards = clonedDepartmentScoreboards
      ? clonedDepartmentScoreboards.map((scoreboard, index) => {
          // Calculating average scores
          let totalWeights = 0;

          scoreboard.kpis.forEach((kpi) => {
            totalWeights += kpi.kPIScoreBoard.KPIWeight;
          });

          let averageScore = 0;

          for (let i = 0; i < scoreboard.kpis.length; i++) {
            const kpi = scoreboard.kpis[i];
            const score =
              (kpi.kPIScoreBoard.KPIScore * kpi.kPIScoreBoard.KPIWeight) /
              totalWeights;
            averageScore += score;
          }

          // Considering scores for each month
          const kpiTitles = scoreboard.kpis.map((kpi) => {
            return <td key={kpi.id}>{kpi.title}</td>;
          });

          const standardMeasures = scoreboard.kpis.map((kpi) => {
            return <td key={kpi.id}>100 %</td>;
          });
          const kpiScores = scoreboard.kpis.map((kpi) => {
            const score =
              kpi.kPIScoreBoard.KPIScore != null
                ? kpi.kPIScoreBoard.KPIScore
                : 0;

            let style = null;
            if (score < 50)
              style = {
                backgroundColor: '#cc6600',
              };
            else if (score < 60)
              style = {
                backgroundColor: '#ffcccc',
              };
            else if (score < 75)
              style = {
                backgroundColor: '#ffd11a',
              };
            else if (score < 90)
              style = {
                backgroundColor: '#4dd2ff',
              };
            else
              style = {
                backgroundColor: '#00cc44',
              };

            return (
              <td style={style} key={kpi.id}>
                {score}
              </td>
            );
          });

          // Calcualting cummulative average

          let cummulativeAverageScores = 0;
          for (
            let current = index;
            current < averageScoresList.length;
            current++
          ) {
            cummulativeAverageScores += averageScoresList[current];
            // console.log(cummulativeAverages[current]);
          }

          // console.log(averageScoresList);

          const kpiWeights = scoreboard.kpis.map((kpi) => {
            return (
              <td key={kpi.id}>
                {kpi.kPIScoreBoard.KPIWeight != null
                  ? kpi.kPIScoreBoard.KPIWeight
                  : 0}
              </td>
            );
          });

          return (
            <React.Fragment key={scoreboard.id}>
              <tr>
                <td>{moment(scoreboard.updatedAt).format('DD/MM/YYYY')}</td>
                <td>{moment(scoreboard.createdAt).format('DD/MM/YYYY')}</td>
                <td>
                  <table className="container">
                    <tbody>
                      <tr>
                        <th>Title</th>
                        {kpiTitles}
                      </tr>
                      <tr>
                        <th>Standard Measure</th>
                        {standardMeasures}
                      </tr>
                      <tr>
                        <th>Weighted</th>
                        {kpiWeights}
                      </tr>
                      <tr>
                        <th>Score</th>
                        {kpiScores}
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td className="text-center">{averageScore.toFixed(1)}</td>
                <td className="text-center">
                  {(
                    cummulativeAverageScores /
                    (averageScoresList.length - index)
                  ).toFixed(1)}
                </td>
                <td className="">
                  {/* The approved value should be coming from the database */}
                  <p>
                    <button
                      title="Clicking this button toggle approval status"
                      type="button"
                      className="btn btn-light"
                      onClick={() => this.onChangeApproval(scoreboard.id)}
                    >
                      {scoreboard.isApproved ? 'Approved' : 'Not yet Approved'}
                    </button>
                  </p>

                  <p>
                    <button
                      type="button"
                      onClick={() =>
                        this.props.history.push(
                          `/admin/edit-scores/${scoreboard.id}`
                        )
                      }
                      className="btn btn-light"
                    >
                      Update Scores
                    </button>
                  </p>
                  <p>
                    <button
                      type="button"
                      onClick={() =>
                        this.props.history.push(
                          `/admin/upload-report/${scoreboard.id}`
                        )
                      }
                      className="btn btn-light"
                    >
                      Upload Reports
                    </button>
                  </p>
                  <p>
                    <button
                      type="button"
                      onClick={() =>
                        this.props.history.push(
                          `/admin/reports/${scoreboard.id}`
                        )
                      }
                      className="btn btn-light"
                    >
                      View Reports
                    </button>
                  </p>

                  <p>
                    <DeleteButtonComponent
                      scoreboard={scoreboard}
                      deleteScoreboard={this.deleteScoreboard}
                    />
                  </p>
                </td>
              </tr>
            </React.Fragment>
          );
        })
      : null;

    return (
      <div className="my-3">
        <div className="spin-loader"></div>
        <h3 className="mb-2">
          {isLoading ? <div className="spinner-border"></div> : ''}{' '}
          {clonedDepartmentScoreboards
            ? clonedDepartmentScoreboards.length > 0
              ? clonedDepartmentScoreboards[0].user.username + "'s Scoreboards"
              : 'No scoreboard'
            : 'No scoreboard'}
        </h3>
        <div className="text-right">
          <label className="mr-sm-2" htmlFor="number">
            Number per page
          </label>
          <select
            value={this.state.number}
            name="number"
            onChange={this.onChange}
            id="number"
            className=""
          >
            <option value="1">1</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="all">All</option>
          </select>
        </div>

        {/* Dowlnload button */}
        <div className="text-left mb-2">
          <button
            onClick={this.exportToPdf}
            id="exportButton"
            className="btn btn-lg btn-danger clearfix"
          >
            <span className="fa fa-file-pdf-o"></span> Export to PDF
          </button>
        </div>

        <table
          id="ascoreboards"
          className="table table-striped table-bordered table-hover text-left"
          style={{ width: '100%' }}
        >
          <thead>
            <tr>
              <th scope="col">Modified</th>
              <th scope="col">Created</th>
              <th className="text-center" scope="col">
                KPIs
              </th>
              <th>Average Score</th>
              <th>Cummulative Avg Score</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{departmentScoreboards}</tbody>
        </table>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      scoreboardsData: state.fetchScoreboardsReducer,
      authenticateUserData: state.authenticateUserReducer,
    };
  },
  {
    fetchScoreboards,
  }
)(ScoreboardsListComponent);
