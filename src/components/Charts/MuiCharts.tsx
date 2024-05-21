import { BarChart, PieChart, pieArcLabelClasses } from '@mui/x-charts';

import { IMuiBarChart, IMuiPieChart } from '../../types';

export const MuiPieChart = ({ participiants, arcLabel, colors, width, height }: IMuiPieChart) => {
    return (
        <PieChart
            series={[
                {
                    data: participiants,
                    innerRadius: 64,
                    outerRadius: 126,
                    paddingAngle: 2,
                    cornerRadius: 5,
                    startAngle: 0,
                    endAngle: 360,
                    cx: 150,
                    cy: 150,
                    faded: { innerRadius: 30, additionalRadius: -30 },
                    highlightScope: { faded: 'global', highlighted: 'item' },
                    arcLabel: arcLabel,
                },
            ]}
            sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                    fill: 'white',
                    fontSize: 14,
                },
            }}
            colors={colors}
            width={width}
            height={height}
        />
    );
};

export const MuiBarChart = ({ chartName, xAxisLabels, seriesData, width, height }: IMuiBarChart) => {
    return (
        <BarChart
            xAxis={[
                {
                    scaleType: 'band',
                    data: xAxisLabels,
                    label: chartName,
                },
            ]}
            series={[
                {
                    data: seriesData
                },
            ]}
            width={width}
            height={height}
        />
    );
};

export const MuiBarChartDataInfo = ({ participiants }: IMuiBarChart) => {
    return (
        !participiants ? (
            <></>
        ) : (
            <div className="age-infs">
                <div className="infs">
                    <div className="inf-box id-0" />
                    <span>
                        18 Yaş Altı: {participiants[0]} Kişi
                    </span>
                </div>
                <div className="infs">
                    <div className="inf-box id-1" />
                    <span>
                        18-25 Yaş: {participiants[1]} Kişi
                    </span>
                </div>
                <div className="infs">
                    <div className="inf-box id-2" />
                    <span>
                        26-35 Yaş: {participiants[2]} Kişi
                    </span>
                </div>
                <div className="infs">
                    <div className="inf-box id-3" />
                    <span>
                        36-45 Yaş: {participiants[3]} Kişi
                    </span>
                </div>
                <div className="infs">
                    <div className="inf-box id-4" />
                    <span>
                        46-60 Yaş: {participiants[4]} Kişi
                    </span>
                </div>
                <div className="infs">
                    <div className="inf-box id-5" />
                    <span>
                        60 Yaş Üzeri: {participiants[5]} Kişi
                    </span>
                </div>
            </div>
        )
    );
};