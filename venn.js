
    let lastClickedButton = null;

    const regionMapping = {
      "A ∩ B ∩ C": ["A", "B", "C"],
      "A ∩ B": ["A", "B"],
      "A ∩ C": ["A", "C"],
      "B ∩ C": ["B", "C"],
      "A ∪ B ∪ C": ["A", "B", "C"],
      "A'": ["A"],
      "B'": ["B"],
      "C'": ["C"],
      "(A ∩ B)'": ["A", "B"],
      "(A ∪ B)'": ["A", "B"],
      "(A ∪ B ∪ C)'": ["A", "B", "C"],
      "B ∪ (A ∩ C')": ["B", "A", "C"],
      "A ∪ (B ∩ C')": ["A", "B", "C"],
      "B ∩ (A ∪ C')": ["B", "A", "C"],
      "C ∩ (A ∪ B')": ["C", "A", "B"],
      "A ∩ (B ∪ C')": ["A", "B", "C"],
      "A ∪ (B ∩ C)": ["A", "B", "C"],
      "B ∪ (A ∩ C)": ["B", "A", "C"],
      "(A ∩ B) ∪ C": ["A", "B", "C"]
    };

    const regionColors = {
      "default": "#FFA500"
    };

    function highlightRegion(region, button) {
      if (lastClickedButton) {
        lastClickedButton.classList.remove("active-button");
      }
      button.classList.add("active-button");
      lastClickedButton = button;

      d3.selectAll(".venn-area path").style("fill", "white");
      d3.select("#container").style("background-color", "#ffffff");

      const sets = regionMapping[region];

      if (sets) {
        if (region === "(A ∩ B)'") {
          d3.selectAll(".venn-area path")
            .filter(function(d) {
              return !(d.sets.includes("A") && d.sets.includes("B"));
            })
            .style("fill", regionColors["default"]);
          d3.select("#container").style("background-color", regionColors["default"]);
        } else if (region === "(A ∪ B)'") {
          d3.selectAll(".venn-area path")
            .filter(function(d) {
              return !(d.sets.includes("A") || d.sets.includes("B"));
            })
            .style("fill", regionColors["default"]);
          d3.select("#container").style("background-color", regionColors["default"]);
        } else if (region === "(A ∪ B ∪ C)'") {
          d3.selectAll(".venn-area path")
            .filter(function(d) {
              return !(d.sets.includes("A") || d.sets.includes("B") || d.sets.includes("C"));
            })
            .style("fill", regionColors["default"]);
          d3.select("#container").style("background-color", regionColors["default"]);
        } else if (region === "B ∪ (A ∩ C')") {
          d3.selectAll(".venn-area path")
            .filter(function(d) {
              return d.sets.includes("B") || (d.sets.includes("A") && !d.sets.includes("C"));
            })
            .style("fill", regionColors["default"]);
          d3.select("#container").style("background-color", regionColors["default"]);
        } else if (region === "A ∪ (B ∩ C')") {
          d3.selectAll(".venn-area path")
            .filter(function(d) {
              return d.sets.includes("A") || (d.sets.includes("B") && !d.sets.includes("C"));
            })
            .style("fill", regionColors["default"]);
          d3.select("#container").style("background-color", regionColors["default"]);
        } else if (region === "B ∩ (A ∪ C')") {
          d3.selectAll(".venn-area path")
            .filter(function(d) {
              return d.sets.includes("B") && (d.sets.includes("A") || !d.sets.includes("C"));
            })
            .style("fill", regionColors["default"]);
          d3.select("#container").style("background-color", regionColors["default"]);
        } else if (region === "C ∩ (A ∪ B')") {
          d3.selectAll(".venn-area path")
            .filter(function(d) {
              return d.sets.includes("C") && (d.sets.includes("A") || !d.sets.includes("B"));
            })
            .style("fill", regionColors["default"]);
          d3.select("#container").style("background-color", regionColors["default"]);
        } else if (region === "A ∩ (B ∪ C')") {
          d3.selectAll(".venn-area path")
            .filter(function(d) {
              return d.sets.includes("A") && (d.sets.includes("B") || !d.sets.includes("C"));
            })
            .style("fill", regionColors["default"]);
          d3.select("#container").style("background-color", regionColors["default"]);
        } else if (region === "A ∪ (B ∩ C)") {
          d3.selectAll(".venn-area path")
            .filter(function(d) {
              return d.sets.includes("A") || (d.sets.includes("B") && d.sets.includes("C"));
            })
            .style("fill", regionColors["default"]);
        } else if (region === "B ∪ (A ∩ C)") {
          d3.selectAll(".venn-area path")
            .filter(function(d) {
              return d.sets.includes("B") || (d.sets.includes("A") && d.sets.includes("C"));
            })
            .style("fill", regionColors["default"]);
        } else if (region === "(A ∩ B) ∪ C") {
          d3.selectAll(".venn-area path")
            .filter(function(d) {
              return d.sets.includes("C") || (d.sets.includes("A") && d.sets.includes("B"));
            })
            .style("fill", regionColors["default"]);
        } else if (region.endsWith("'")) {
          d3.selectAll(".venn-area path")
            .filter(function(d) {
              return !sets.some(set => d.sets.includes(set));
            })
            .style("fill", regionColors["default"]);
          d3.select("#container").style("background-color", regionColors["default"]);
        } else if (region === "A ∪ B ∪ C") {
          d3.selectAll(".venn-area path").style("fill", regionColors["default"]);
        } else if (region === "A ∩ B ∩ C") {
          d3.selectAll(".venn-area path")
            .filter(function(d) {
              return d.sets.length === 3 && d.sets.includes("A") && d.sets.includes("B") && d.sets.includes("C");
            })
            .style("fill", regionColors["default"]);
        } else {
          d3.selectAll(".venn-area path")
            .filter(function(d) {
              return sets.every(set => d.sets.includes(set));
            })
            .style("fill", regionColors["default"]);
        }
      }
    }

    function resetColors() {
      d3.selectAll(".venn-area path").style("fill", "white");
      d3.select("#container").style("background-color", "#ffffff");

      if (lastClickedButton) {
        lastClickedButton.classList.remove("active-button");
        lastClickedButton = null;
      }
    }

    function createVennDiagram(data) {
      const vennDiv = d3.select("#venn");
      vennDiv.datum(data).call(venn.VennDiagram());

      vennDiv.selectAll("path")
        .style("fill-opacity", "1")
        .style("mix-blend-mode", "none")
        .style("stroke", "black")
        .style("stroke-width", "2px")
        .style("fill", function(d) {
          if (d.sets.length === 1) return "#ADD8E6";
          if (d.sets.length === 2) return "#90EE90";
          if (d.sets.length === 3) return "#800080";
          return "white";
        });
    }

    const data = [
      { sets: ["A"], size: 10 },
      { sets: ["B"], size: 10 },
      { sets: ["C"], size: 10 },
      { sets: ["A", "B"], size: 5 },
      { sets: ["A", "C"], size: 5 },
      { sets: ["B", "C"], size: 5 },
      { sets: ["A", "B", "C"], size: 2 }
    ];

    createVennDiagram(data);

