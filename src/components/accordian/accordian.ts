import { Component,ViewChild, OnInit, Renderer, Input } from '@angular/core';

/**
 * Generated class for the AccordianComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'accordian',
  templateUrl: 'accordian.html'
})
export class AccordianComponent {

  text: string;
  accordianExpanded = false;
  @ViewChild("cc") cardContent:any;
  @Input() public title;
  @Input() public iconname;
  icon: string = "md-arrow-dropdown";
  constructor(public renderer:Renderer) {
    console.log('Hello AccordianComponent Component');
    this.text = 'Hello World';
  }
  ngOnInit(){
    // console.log(this.cardContent.nativeElement);
    this.renderer.setElementStyle(this.cardContent.nativeElement,"webkitTransition","max-height 500ms,padding 500ms");
  }

  toggleAccordian(){
    if(this.accordianExpanded){
      this.renderer.setElementStyle(this.cardContent.nativeElement,"max-height","0px");
      this.renderer.setElementStyle(this.cardContent.nativeElement,"padding","0px 16px");
    }
    else{
      this.renderer.setElementStyle(this.cardContent.nativeElement,"max-height","500px");
      this.renderer.setElementStyle(this.cardContent.nativeElement,"padding","13px 16px");
    }
    this.accordianExpanded = !this.accordianExpanded;
    this.icon = this.icon == "md-arrow-dropdown" ? "md-arrow-dropup" : "md-arrow-dropdown";
  }
}
