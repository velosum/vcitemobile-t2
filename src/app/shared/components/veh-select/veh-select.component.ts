import { Component, OnInit, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
// import { getRepository, Repository, BaseEntity } from 'typeorm';
import { Storage } from '@ionic/storage';
const STORAGE_KEY_LOCATION = 'location';
const STORAGE_KEY_PLATECOLOR = 'platecolor';
const STORAGE_KEY_PLATETYPE = 'platetype';
const STORAGE_KEY_VEHCOLOR = 'vehcolor';
const STORAGE_KEY_VEHMAKE = 'vehmake';
const STORAGE_KEY_VEHSTATE = 'vehstate';
const STORAGE_KEY_VIOLATION = 'violation';

@Component({
  selector: 'veh-select',
  templateUrl: './veh-select.component.html',
  styleUrls: ['./veh-select.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR,  useExisting: forwardRef(() => VehSelectComponent),  multi: true }
  ]
})
export class VehSelectComponent implements OnInit, ControlValueAccessor {

  @Input('entity')
  entityName: string;

  @Input('valueField')
  valueField = 'Abbreviation';

  @Input('displayField')
  displayField = 'Name';

  @Input()
  placeholder = 'Select';

  @Input()
  default: any;

  @Output()
  selectChange = new EventEmitter();

  list: any;

  _value: any;
  onChange: Function = () => { };
  onTouched: Function = () => { };

  get value() {
    return this._value;
  }

  set value(value: any) {

    if (value) {
      this._value = value;
      this.onChange(value);
      this.onTouched();

      this.selectChange.emit(value);
    }
  }

  constructor(private storage: Storage) { }

  async ngOnInit() {
    if (!this.entityName) {
      // throw error
      return;
    }

    const repository  = this.entityName;
    if (repository) {
         if (repository == 'PlateColor') {
        await this.storage.get(STORAGE_KEY_PLATECOLOR).then(values => {
          this.list = values;
        });
      } else if (repository == 'platetype') {
        await this.storage.get(STORAGE_KEY_PLATETYPE).then(values => {
          this.list = values;
        });
      } else if (repository == 'vehcolor') {
        await this.storage.get(STORAGE_KEY_VEHCOLOR).then(values => {
          this.list = values;
        });
      } else if (repository == 'vehmake') {
        await this.storage.get(STORAGE_KEY_VEHMAKE).then(values => {
          this.list = values;
        });
      } else if (repository == 'vehstate') {
        await this.storage.get(STORAGE_KEY_VEHSTATE).then(values => {
          this.list = values;
        });
      } else if (repository == 'Violation') {
        await this.storage.get(STORAGE_KEY_VIOLATION).then(values => {
          this.list = values;
        });
      }
    }

    if (this.default) {
      this.value = this.default[this.valueField];
    }
  }

  getLabel(entity: any) {
    return entity[this.displayField];
  }

  writeValue(value: any) {
    setTimeout(() => {
    this.value = value;
    }, 500);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  entityCompare(a: any, b: any) {
    return a.id === b.id;
  }

}
