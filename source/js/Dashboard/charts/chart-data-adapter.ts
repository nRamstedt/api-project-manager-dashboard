import { DashboardGraph, DashboardProject } from "../model/DashboardContext";
const getBackgroundColors = () => [
  'rgba(255, 99, 132, 0.5)',
  'rgba(54, 162, 235, 0.5)',
  'rgba(255, 206, 86, 0.5)',
  'rgba(75, 192, 192, 0.5)',
  'rgba(153, 102, 255, 0.5)',
  'rgba(255, 159, 64, 0.5)',
]



export function mapPolarData(
  label: string,
  graph: DashboardGraph,
  getKeys: (project: DashboardProject) => string[]) {
  const {keys, values} = mapGraphData(graph, getKeys)

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: false,
        text: label
      },
    }
  }
  const data = {
    labels: keys,
    datasets: [
      {
        label,
        data: values,
        backgroundColor: getBackgroundColors(),
        borderWidth: 1,
      },
    ],
  }
  return {data, options}
}

export function mapRadarData (
    label: string,
    graph: DashboardGraph,
    getKeys: (project: DashboardProject) => string[]) {
    const {keys, values} = mapGraphData(graph, getKeys)

    const options = {
      responsive: true,
      maintainAspectRatio: true,
      scale: {
        ticks: {
          beginAtZero: true,
          callback: (value: number) => `${value}           `,
          min: -0.001,
          max: 100
        }
      },
      plugins: {
        legend: {
          position: 'right' as const,
        },
        title: {
          display: false,
          text: label
        },
      }

    }

    const data = {
        labels: keys,
        datasets: [
          {
            label,
            data: values,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      };
    return {data, options}
}

export function mapVerticalBarData (
    label: string,
    graph: DashboardGraph,
    getKeys: (project: DashboardProject) => string[]) {
    const {keys, values} = mapGraphData(graph, getKeys)
    
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'right' as const,
            display: false
          },
          title: {
            display: false,
            text: label
          },
        }
    }
    const data = {
        labels: keys,
        datasets: [
          {
            label,
            data: values,
            backgroundColor: getBackgroundColors(),
          }
        ],
      }
    return {
        data, options
    }
}
export function mapDoughnutData (
    label: string,
    graph: DashboardGraph,
    getKeys: (project: DashboardProject) => string[]) {
    const {keys, values} = mapGraphData(graph, getKeys)
    return {
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'right' as const,
            },
            title: {
              display: false,
              text: label
            },
          }
        },
        data: {
            labels: keys,
            datasets: [{
                label,
                data: values,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1
            }]
        }
    }
}



function mapGraphData (
    graph: DashboardGraph,
    getKeys: (project: DashboardProject) => string[]) {
    const lookup = graph.lookupBy(project => (getKeys(project) || []))
    return {
        keys: Object.keys(lookup),
        values: Object.values(lookup).map(projects => projects.length)
    }
}
