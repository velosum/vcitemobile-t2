export class CitationViewMidel {
    constructor() { }
    attachments: [];
    comments: '';
    custKey: '';
    docKey: '';
    expiration_date: '';
    id: number;
    is_submitted: false;
    is_valid: false;
    is_visible: true;
    issue_date: '';
    issue_time: '';
    location: {
        ParcelID: '';
        Street: '';
        StreetNumber: '';
        Unit: '';
        address: '';
        id: any;
        latitude: '';
        longitude: '';
        source: 'input';
    };
    meter_no: '';
    officer_id: '';
    plate_color: any;
    plate_type: {
        Abbreviation: '',
        Name: '',
        id: 1
    };
    remarks: '';
    serial_number: '';
    timestamp: String;
    vehicle_body_type: '';

    vehicle_color:
        {
            Abbreviation: '',
            Name: '',
            id: ''
        };
    vehicle_license: '';
    vehicle_make: {
        Abbreviation: '',
        Name: '',
        id: ''
    };
    vehicle_state:
        {
            Abbreviation: '',
            Name: '',
            id: ''
        };
    vehicle_vin: '';
    violations: [];
    void: false;
    warning: false;
}