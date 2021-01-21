d3.json("samples.json").then( data => {
    // Set datasets
    var data_names = data.names;
    // DROPDOWN MENU
    var DropDownMenu = d3.select("#selDataset");
    // Remove old html id names
    DropDownMenu.html("");
    // Append id names option to html
    data_names.map(id_name => DropDownMenu.append("option").attr("value",id_name).html(id_name));
    // Initalize graphs on homepage
    init(data);

});

function init(data){
    var data_names = data.names;
    var data_samples = data.samples;
    // Initial Graph 940
    var init_sample = data_samples.filter(sample => sample.id == "940")
    // Sort Data by Sample_Values
    var sorted_init = init_sample.sort( (a, b) => b.samples_values - a.samples_values)
    // Set values for graphs
    var samplevalue = sorted_init[0].sample_values
    var otuids = sorted_init[0].otu_ids
    var init_y = otuids.map(sample => `OTU ${sample}`)
    var otulabels = sorted_init[0].otu_labels
    
    // HORIZONTAL BAR GRAPH
    var data1 = [{
        type: "bar",
        // Take top 10 OTU
        x: samplevalue.slice(0,10).reverse(),
        y: init_y.slice(0,10).reverse(),
        text: otulabels.slice(0,10).reverse(),
        orientation: "h"
    }];
    // Plot Bar Graph
    Plotly.newPlot("bar",data1);

    // BUBBLE GRAPH
    var data2 = [{
        x: otuids,
        y: samplevalue,
        mode: 'markers',
        marker: {
            size: samplevalue,
            color: otuids
        },
        text: otulabels
    }];
    // Plot Bar Graph
    Plotly.newPlot("bubble",data2);

    //DISPLAY META
    var metadata = data.metadata.filter(sample => sample.id == "940")
    console.log(metadata)
    var info = `id: ${metadata[0].id} <br>
                ethnicity: ${metadata[0].ethnicity} <br>
                gender: ${metadata[0].gender} <br>
                age: ${metadata[0].age} <br>
                location: ${metadata[0].location} <br>
                bbtype: ${metadata[0].bbtype} <br>
                wfreq: ${metadata[0].wfreq} 
                `
    d3.select("#sample-metadata").html(info)
}

// UPDATE PLOT
d3.selectAll("body").on('change', updatePlotly);

function updatePlotly(){
    d3.json("samples.json").then(data => {

    var dropdownMenu = d3.select("#selDataset").node().value;
    // Clear graphs
    d3.select("#bar").html("");
    d3.select("#bubble").html("");
    d3.select("#sample-metadata").html("");
    // Set datasets
    var data_names = data.names;
    var data_samples = data.samples;
    // Initial Graph 940
    var init_sample = data_samples.filter(sample => sample.id == dropdownMenu)
    // Sort Data by Sample_Values
    var sorted_init = init_sample.sort( (a, b) => b.samples_values - a.samples_values)
    // Set 
    var samplevalue = sorted_init[0].sample_values
    var otuids = sorted_init[0].otu_ids
    var init_y = otuids.map(sample => `OTU ${sample}`)
    var otulabels = sorted_init[0].otu_labels
    // HORIZONTAL BAR GRAPH
    var data1 = [{
        type: "bar",
        // Take top 10 OTU
        x: samplevalue.slice(0,10).reverse(),
        y: init_y.slice(0,10).reverse(),
        text: otulabels.slice(0,10).reverse(),
        orientation: "h"
    }];
    // Plot Bar Graph
    Plotly.newPlot("bar",data1);

    // BUBBLE GRAPH
    var data2 = [{
        x: otuids,
        y: samplevalue,
        mode: 'markers',
        marker: {
            size: samplevalue,
            color: otuids
        },
        text: otulabels
    }];
    // Plot Bar Graph
    Plotly.newPlot("bubble",data2);

    //DISPLAY META
    var metadata = data.metadata.filter(sample => sample.id == dropdownMenu)
    console.log(metadata)
    var info = `id: ${metadata[0].id} <br>
                ethnicity: ${metadata[0].ethnicity} <br>
                gender: ${metadata[0].gender} <br>
                age: ${metadata[0].age} <br>
                location: ${metadata[0].location} <br>
                bbtype: ${metadata[0].bbtype} <br>
                wfreq: ${metadata[0].wfreq} 
                `
    d3.select("#sample-metadata").html(info)

    });
};