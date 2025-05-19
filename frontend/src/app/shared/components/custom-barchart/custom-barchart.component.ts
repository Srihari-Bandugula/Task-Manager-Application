import { Component, Input } from '@angular/core';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-custom-barchart',
  imports: [NgxChartsModule],
  templateUrl: './custom-barchart.component.html',
  styleUrl: './custom-barchart.component.scss',
})
export class CustomBarchartComponent {
  @Input() data: { name: string; value: number }[] = [];

  colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#00BC7D', '#FE9900', '#FF1F57'],
  };

  customColors: { name: string; value: string }[] = [];

  ngOnInit() {
    this.generateCustomColors();
  }

  generateCustomColors() {
    const priorityColors: Record<string, string> = {
      Low: '#00BC7D',
      Medium: '#FE9900',
      High: '#FF1F57',
    };

    this.customColors = this.data.map((entry) => {
      const color = priorityColors[entry.name] || '#00BC7D';
      return { name: entry.name, value: color };
    });
  }
}
