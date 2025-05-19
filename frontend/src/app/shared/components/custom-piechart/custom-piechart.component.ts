import { Component, Input, OnInit } from '@angular/core';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { CustomLegendComponent } from '../custom-legend/custom-legend.component';

@Component({
  selector: 'app-custom-piechart',
  imports: [NgxChartsModule, CustomLegendComponent],
  templateUrl: './custom-piechart.component.html',
  styleUrl: './custom-piechart.component.scss',
})
export class CustomPiechartComponent implements OnInit {
  @Input() data: { name: string; value: number }[] = [];
  @Input() colors: string[] = [];
  colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: [],
  };

  customColors: { name: string; value: string }[] = [];
  payload: { color: string; value: string }[] = [];

  ngOnInit() {
    // Validate and assign colors
    if (this.colors && this.colors.length > 0) {
      this.colorScheme.domain = this.colors;
    } else {
      console.error('No colors provided for the pie chart!');
    }

    // Validate data
    if (!this.data || !Array.isArray(this.data) ) {
      console.error('Data is either missing or not in the correct format');
    } else {
      this.data.forEach((entry, index) => {
        if (typeof entry.value !== 'number' || isNaN(entry.value)) {
          console.warn(`Invalid value at index ${index}. Defaulting to 0.`);
          entry.value = 0;
        }
      });

      // Generate custom color mapping
      this.customColors = this.data.map((entry, index) => ({
        name: entry.name,
        value: this.colors[index % this.colors.length] || '#ccc',
      }));

      // Prepare payload for custom legend
      this.payload = this.data.map((entry, index) => ({
        color: this.colors[index % this.colors.length] || '#ccc',
        value: entry.name,
      }));
    }
  }

  customLabelFormatting(value: number): string {
    return typeof value === 'number' && !isNaN(value)
      ? value.toLocaleString()
      : 'N/A';
  }
}
