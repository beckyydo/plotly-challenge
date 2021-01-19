
d3.json("samples.json").then( data => {
    // Set datasets
    var data_names = data.names;
    var data_samples = data.samples;

    // DROPDOWN MENU
    var DropDownMenu = d3.select("#selDataset");
    // Remove old html id names
    DropDownMenu.html("");
    // Append id names option to html
    data_names.map(id_name => DropDownMenu.append("option").attr("value",id_name).html(id_name));

    // Initial Graph 940
    var init_sample = data_samples.filter(sample => sample.id == "940")
    // Sort Data by Sample_Values
    var sorted_init = init_sample.sort( (a, b) => b.samples_values - a.samples_values)
    //var sorted_init = sorted_init[0]
    var init_x = sorted_init[0].sample_values
    var init_y = sorted_init[0].otu_ids.map(sample => `OTU ${sample}`)

    var data = [{
        type: "bar",
        x: init_x.slice(0,9),
        y: init_y.slice(0,9),
        orientation: "h"
    }];

    Plotly.newPlot("bar",data);
});


function filtersample(sample){
    return sample.id == "940"
}


function updatePlotly(){
    var dropdownMenu = d3.select("#selDataset");
    var dataset = dropdownMenu.node().value;
    var chart = d3.selectAll("#bar").node();


};