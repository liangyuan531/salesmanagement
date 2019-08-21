import React from 'react';
import { connect } from 'react-redux'
import { getTotalSales } from '../../redux/actions/homeAction'
import MonthlyChart from './MonthlyChart'
import WeeklyChart from './WeeklyChart'
import { ButtonToolbar, DropdownButton, Dropdown } from 'react-bootstrap'
import ReactEcharts from 'echarts-for-react'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.props.getTotalSales();
        this.state = {
            years: ['2019', '2018', '2017'], // not too much data, define 3 year, change later
            // by default, 
            selectedYear: '2019',
            selectedPeriod: 'monthly'
        }
    }
    
    getOptionOfTotal = () => {
        const option = {
            title: {text: 'Total Sales/Cost'},
            tooltip: {},
            series: [{
                name: 'sales',
                type: 'pie',
                data: [{
                    name: 'Sales',
                    value: this.props.total.totalSale
                }, 
                {
                    name: 'Cost',
                    value: this.props.total.totalCost
                }]
            }]
        }
        return option
    }

    handleYear = (eventKey, event) => {
        this.setState({
            selectedYear: eventKey
        })
    }

    handlePeriod = (eventKey, event) => {
        this.setState({
            selectedPeriod: eventKey
        })
    }

    render() {
        const renderDropdownBtn = (
            <div className="sub-charts">
                <ButtonToolbar>
                    <DropdownButton
                      title="Year"
                      id="Year"
                      key="Year"
                      variant="primary"
                    >
                    {this.state.years.map(year=>(
                        <Dropdown.Item key={year} eventKey={year} onSelect={this.handleYear}>{year}</Dropdown.Item>
                    ))}
                    </DropdownButton>
                    <DropdownButton
                      title="Period"
                      id="Period"
                      key="Period"
                      variant="success"
                    >
                      <Dropdown.Item eventKey="monthly" onSelect={this.handlePeriod}>Monthly</Dropdown.Item>
                      <Dropdown.Item eventKey="weekly" onSelect={this.handlePeriod}>Weekly</Dropdown.Item>
                    </DropdownButton>
                </ButtonToolbar>
            </div>
        )

        return(
            <div className="home">
                <ReactEcharts option={this.getOptionOfTotal()} lazyUpdate={true}/>
                {renderDropdownBtn}
                {this.state.selectedPeriod === "monthly" ? 
                    <MonthlyChart year={this.state.selectedYear}/>
                    :
                    <WeeklyChart year={this.state.selectedYear}/>
                }
            </div>
            
        )
    }
}

const mapStateToProps = (state) => ({
    total: state.total.total
})

export default connect(mapStateToProps, {getTotalSales})(Home);