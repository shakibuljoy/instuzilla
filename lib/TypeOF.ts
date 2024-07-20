export type AttendList = {
    id: string,
    klass: string,
    student: {
      id: string,
      student_id: string,
      position: string | null,
      first_name: string,
      last_name: string | null,
      fathers_name: string,

  },
    presents: boolean,
    date: string,
  }


  export type studentInfo = {
    id:string,
    admission_date:string,
    student_id: string,
    position: number | null,
    klass:string,
    image: string,
    image_url: string | null,
    first_name: string,
    last_name: string,
    mobile: string,
    mothers_name: string,
    fathers_name: string,
    address: string,
    birth_date: string,
    birth_certificate_no: string,
    nid_no: string | null,
    institute: string
  }