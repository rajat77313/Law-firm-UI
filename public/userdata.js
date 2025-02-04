export let users = [
    {
        "id": 10001,
        "name": "User 1",
        "father_name": "A.K Rajkumar",
        "case_title": "User vs State Govt",
        "phone_no": 9929939999,
        "email": "user1@email.com",
        "dob": "21998-09-12",
        "role": "Defendant",
        "isActive": true,
        "file_no": "A7-111",
        "address": "Some Address",
        "payment_history": [
            { "payment_date": "2025-02-19", "payment_amount": "2500", "payment_via": "cash" },
            { "payment_date": "2025-03-05", "payment_amount": "3000", "payment_via": "online" }
        ],
        "next_hearing": "2025-04-02",
        "hearing_details": [
            {
                "id": 1,
                "hearing_date": "2025-02-19",
                "image": "",
                "court_order": "The court has decided to adjourn the hearing to gather additional evidence and statements from both parties involved in the case.",
                "next_date": "2025-04-02"
            },
            {
                "id": 2,
                "hearing_date": "2025-04-02",
                "image": "",
                "court_order": "An interim order has been issued, allowing temporary relief to the petitioner until the next hearing date.",
                "next_date": "2025-06-15"
            },
            {
                "id": 3,
                "hearing_date": "2025-06-15",
                "image": "",
                "court_order": "The court mandates a submission of financial records and other necessary documentation before the next proceeding.",
                "next_date": "2025-08-28"
            },
            {
                "id": 4,
                "hearing_date": "2025-08-28",
                "image": "",
                "court_order": "The final argument session has been scheduled, and both parties are required to ensure full representation.",
                "next_date": "2025-11-10"
            }
        ]
    },
    {
        "id": 10002,
        "name": "User 2",
        "father_name": "R. Sharma",
        "case_title": "User vs Private Firm",
        "phone_no": 9876543210,
        "email": "user2@email.com",
        "dob": "21998-09-12",
        "role": "Plaintiff",
        "isActive": false,
        "file_no": "B8-222",
        "address": "Another Address",
        "payment_history": [
            { "payment_date": "2025-01-12", "payment_amount": "5000", "payment_via": "bank transfer" },
            { "payment_date": "2025-02-20", "payment_amount": "4500", "payment_via": "cash" }
        ],
        "next_hearing": "2025-03-12",
        "hearing_details": [
            {
                "id": 1,
                "hearing_date": "2025-01-15",
                "image": "",
                "court_order": "The plaintiff has presented new evidence, leading to a postponement of the next hearing.",
                "next_date": "2025-03-12"
            },
            {
                "id": 2,
                "hearing_date": "2025-03-12",
                "image": "",
                "court_order": "The defendant has been asked to submit financial reports.",
                "next_date": "2025-05-10"
            }
        ]
    },
    {
        "id": 10003,
        "name": "User 3",
        "father_name": "M.K Verma",
        "case_title": "User vs Municipal Corporation",
        "phone_no": 9998887777,
        "email": "user3@email.com",
        "dob": "21998-09-12",
        "role": "Defendant",
        "isActive": true,
        "file_no": "C9-333",
        "address": "City Center",
        "payment_history": [
            { "payment_date": "2025-01-20", "payment_amount": "3200", "payment_via": "UPI" },
            { "payment_date": "2025-03-18", "payment_amount": "4000", "payment_via": "cash" },
            { "payment_date": "2025-04-22", "payment_amount": "3500", "payment_via": "credit card" }
        ],
        "next_hearing": "2025-04-05",
        "hearing_details": [
            {
                "id": 1,
                "hearing_date": "2025-02-10",
                "image": "",
                "court_order": "The hearing has been adjourned due to unavailability of one of the parties.",
                "next_date": "2025-04-05"
            }
        ]
    },
    {
        "id": 10004,
        "name": "User 4",
        "father_name": "J.D Gupta",
        "case_title": "User vs Insurance Company",
        "phone_no": 9123456789,
        "email": "user4@email.com",
        "dob": "21998-09-12",
        "role": "Plaintiff",
        "isActive": true,
        "file_no": "D10-444",
        "address": "Green Street",
        "payment_history": [
            { "payment_date": "2025-03-15", "payment_amount": "6000", "payment_via": "bank transfer" },
            { "payment_date": "2025-04-25", "payment_amount": "5200", "payment_via": "cash" }
        ],
        "next_hearing": "2025-05-08",
        "hearing_details": [
            {
                "id": 1,
                "hearing_date": "2025-02-22",
                "image": "",
                "court_order": "The judge has requested further documentation before proceeding.",
                "next_date": "2025-05-08"
            }
        ]
    },
    {
        "id": 10005,
        "name": "User 5",
        "father_name": "S.K Mehta",
        "case_title": "User vs Bank",
        "phone_no": 9321098765,
        "email": "user5@email.com",
        "dob": "21998-09-12",
        "role": "Defendant",
        "isActive": false,
        "file_no": "E11-555",
        "address": "Commercial Area",
        "payment_history": [
            { "payment_date": "2025-01-10", "payment_amount": "7000", "payment_via": "UPI" }
        ],
        "next_hearing": "2025-06-01",
        "hearing_details": [
            {
                "id": 1,
                "hearing_date": "2025-03-18",
                "image": "",
                "court_order": "The bank has been asked to clarify the loan repayment schedule.",
                "next_date": "2025-06-01"
            }
        ]
    },
    {
        "id": 10006,
        "name": "User 6",
        "father_name": "H.L Sharma",
        "case_title": "User vs Landlord",
        "phone_no": 9812345678,
        "email": "user6@email.com",
        "dob": "21998-09-12",
        "role": "Plaintiff",
        "isActive": true,
        "file_no": "F12-666",
        "address": "Sector 22",
        "payment_history": [
            { "payment_date": "2025-02-10", "payment_amount": "4000", "payment_via": "cash" },
            { "payment_date": "2025-04-15", "payment_amount": "4500", "payment_via": "online" }
        ],
        "next_hearing": "2025-05-20",
        "hearing_details": [
            {
                "id": 1,
                "hearing_date": "2025-02-25",
                "image": "",
                "court_order": "The court has requested the landlord to provide lease documents.",
                "next_date": "2025-05-20"
            }
        ]
    },
    {
        "id": 10007,
        "name": "User 7",
        "father_name": "B.P Yadav",
        "case_title": "User vs Traffic Department",
        "phone_no": 9871122334,
        "email": "user7@email.com",
        "dob": "21998-09-12",
        "role": "Defendant",
        "isActive": false,
        "file_no": "G13-777",
        "address": "Metro City",
        "payment_history": [
            { "payment_date": "2025-01-05", "payment_amount": "2500", "payment_via": "UPI" },
            { "payment_date": "2025-02-20", "payment_amount": "3000", "payment_via": "cash" }
        ],
        "next_hearing": "2025-05-18",
        "hearing_details": [
            {
                "id": 1,
                "hearing_date": "2025-03-10",
                "image": "",
                "court_order": "The case has been adjourned to a later date due to the unavailability of key witnesses.",
                "next_date": "2025-05-18"
            }
        ]
    }
];
