const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

let promise = d3.json(url)
// let otu_title = "Top 10 OTU's Found"

function dropDownMenu () {
    d3.json(url).then((data) => {
        // console.log(data)
        let menuItems = data.names
        let DropDownSelector = d3.select("#selDataset")
        menuItems.forEach((sample) => {
            DropDownSelector
                .append("option")
                .text(sample)
                .property("value", sample);
        });
        demographTable (menuItems[0])
        plotData (menuItems[0]) 
    })

}

dropDownMenu ()

function demographTable (sample_id) {
    d3.json(url).then((data) => {
        
        let metaItems = data.metadata
        let metaArray = metaItems.filter(number => number.id == sample_id)[0];
        console.log(metaArray)

        let tableSelector = d3.select("#sample-metadata")
        tableSelector.html("")

        Object.entries(metaArray).forEach(entry => {
            const [key, value] = entry;
            console.log(key, value);
            tableSelector
                .append("h5")
                .text(`${key}: ${value}`)
          });
    })
}

function optionChanged (sample_id) {
    demographTable (sample_id)
    plotData (sample_id) 
}

function plotData (sample_id) {
    d3.json(url).then((data) => {
        
        let sampleItems = data.samples
        let sampleArray = sampleItems.filter(number => number.id == sample_id)[0];
        console.log(sampleArray)

        let otu_ids = sampleArray.otu_ids

        let sample_values = sampleArray.sample_values 

        let otu_labels = sampleArray.otu_labels

        var bubbleData = [{
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
              color: otu_ids,
              colorscale: "Earth",
              size: sample_values
            }
          }];
          
          var bubbleLayout = {
            title: 'Bubble Chart',
            showlegend: false,
          };
          
          Plotly.newPlot('bubble', bubbleData, bubbleLayout);

          var barData = [{
            x: sample_values.slice(0, 10).reverse(),
            y: otu_ids.slice(0, 10).map((item) => `otu ${item}`).reverse(),
            text: otu_labels.slice(0, 10).reverse(),
            orientation: 'h',
            type: 'bar'
          }];
          
        
          var barlayout = {
            title: 'Bar Chart',
          };
          
          Plotly.newPlot('bar', barData, barlayout);
          
    })

}



// Creating variables ot store bar data
// let sample_values_list = []
// let otu_id_list = []
// let otu_label_list = []

// for (let i = 0; i < metadata.length; i++) {
//     row = metdata[i];
//     sample_values_list.push(row.sample_values_list);
//     otu_ids.push(row.otu_id_list);
//     otu_labels.push(row.otu_label_list);
//   }
  

// // making a bar graph
// let data = [{
//     x: sample_values,
//     y: otu_ids,
//     type: 'horizontal bar'
// }]

// let layout = {
//   title: otu_title
// }

// Plotly.newPlot("plot", data, layout)