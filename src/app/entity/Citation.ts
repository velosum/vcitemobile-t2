import { Entity, PrimaryColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { VehState } from './VehState';
import { VehMake } from './VehMake';
import { VehColor } from './VehColor';
import { Violation } from './Violation';
import { Attachment } from './Attachment';

@Entity("citation")
export class Citation extends BaseEntity {
    @PrimaryColumn()
    id: number;
    
    // Customer ID
    @Column({
        nullable: true
    })
    custKey: number;

    // Serial Number
    @Column({
        nullable: true
    })
    serial_number: string;
    
    // Document Key
    @Column({
        nullable: true
    })
    docKey: number;
    
    // Issue Date
    @Column({
        nullable: true
    })
    issue_date: string;
    
    // Issue Time
    @Column({
        nullable: true
    })
    issue_time: string;
    
    // Officer ID
    @Column({
        nullable: true
    })
    officer_id: string;
    
    // Meter No
    @Column({
        nullable: true
    })
    meter_no: string;
    
    // Vehicle License
    @Column({
        nullable: true
    })
    vehicle_license: string;
    
    // Vehicle VIN
    @Column({
        nullable: true
    })
    vehicle_vin: string;
    
    // Vehicle Body Type
    @Column({
        nullable: true
    })
    vehicle_body_type: string;
    
    // Expiration Date
    @Column({
        nullable: true
    })
    expiration_date: string;
    
    // Plate Color
    @Column({
        nullable: true
    })
    plate_color: string;
    
    // Plate Type
    @Column({
        nullable: true
    })
    plate_type: string;
    
    // Location
    @Column({
        nullable: true
    })
    location: string;
    
    // Remarks
    @Column({
        nullable: true
    })
    remarks: string;
    
    // VOID
    @Column({
        default: false
    })
    void: boolean;
    
    // WARNINGS
    @Column({
        default: false
    })
    warning: boolean;
    
    // @Column({
    //     nullable: true
    // })
    // customerName: string;

    // TIMESTAMP
    @Column({
        nullable: true
    })
    timestamp: string;  //Datetime

    // Vehicle State
    @ManyToOne(type => VehState, {eager: true})
    @JoinColumn({name: 'abbreviation'})
    vehicle_state: VehState;

    // Vehicle Make
    @ManyToOne(type => VehMake,  {eager: true})
    @JoinColumn({name: 'abbreviation'})
    vehicle_make: VehMake;

    // Vehicle Color
    @ManyToOne(type => VehColor, {eager: true})
    @JoinColumn({name: 'abbreviation'})
    vehicle_color: VehColor;

    // Violations
    @OneToMany(type => Violation, () => {})
    violations: Violation[];

    // Attachments
    @OneToMany(type => Attachment, () => {})
    attachments: Attachment[];
}
