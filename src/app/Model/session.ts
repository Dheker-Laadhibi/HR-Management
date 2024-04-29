export interface UserData{
  responseKey?: string,
  data?: {
      accessToken?: string,
      user?: {
          ID?: string,
          name?: string,
          email?:string,
          profilePicture?: string,
          workCompanyId?: string
      }
  }
}

export interface CandidateData{
  responseKey?: string,
  data?: {
      accessToken?: string,
      Candidat?: {
          ID?: string,
          name?: string,
          email?:string,
          workCompanyId?: string
      }
  }
}