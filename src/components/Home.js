import React from 'react';
import { connect } from 'react-redux'
import { getTotalSales } from '../redux/actions/homeAction'

import ReactEcharts from 'echarts-for-react'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.props.getTotalSales();
        this.state = {
            total: this.props.total
        }
    }
    componentDidMount() {
        //this.setState({total: this.props.total})
        // var chart = echarts.init(document.getElementById('main'));
        // chart.setOption({
        //     title: {text: 'Total Sales/Cost'},
        //     tooltip: {},
        //     xAxis: {
        //         data: ["Sales", "Costs"]
        //     },
        //     yAxis: {},
        //     series: [{
        //         name: 'sales',
        //         type: 'pie',
        //         data: ['100', this.state.total.totalCost]
        //     }]
        // })
    }
    getOption = () => {
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
    
    render() {
        return(
            <div className="home">
                <ReactEcharts option={this.getOption()} lazyUpdate={true}/>
            </div>
            
        )
    }
}

const mapStateToProps = (state) => ({
    total: state.total.total
})

export default connect(mapStateToProps, {getTotalSales})(Home);