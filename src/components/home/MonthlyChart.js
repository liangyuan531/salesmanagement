import React from 'react';
import { connect } from 'react-redux'
import { getMonthlyTotal } from '../../redux/actions/homeAction'
import ReactEcharts from 'echarts-for-react'

class MonthlyChart extends React.Component {
    constructor(props) {
        super(props);
        this.props.getMonthlyTotal(this.props.year);
        this.state = {
            year: ""
        }
    }

    componentDidUpdate(prevProps){
        if(this.props.year !== prevProps.year) {
            this.setState({
                year: this.props.year
            })
            this.props.getMonthlyTotal(this.props.year);
        }
    }

    getSales = () => (
        this.props.monthlyTotal.map(total => {
            if(total != null) return total.totalSale
            else return 0
        })
    )
    getOptionOfMonthlyTotal = () => {
        const option = {
            title: {text: `Monthly Sales - ${this.props.year}`},
            tooltip: {},
            xAxis: {
                data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yAxis:{},
            series: [{
                name: 'sales',
                type: 'bar',
                data: this.getSales()
            }]
        }
        return option
    }
    render() {
        return(
            <div className="monthly-charts">
                <ReactEcharts option={this.getOptionOfMonthlyTotal()} lazyUpdate={true}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    monthlyTotal: state.total.monthlyTotal
})

export default connect(mapStateToProps, {getMonthlyTotal})(MonthlyChart);