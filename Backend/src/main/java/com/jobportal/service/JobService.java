package com.jobportal.service;

import com.jobportal.dto.ApplicantDTO;
import com.jobportal.dto.Application;
import com.jobportal.dto.JobDTO;
import com.jobportal.exception.JobPortalExpection;

import java.util.List;

public interface JobService {

    public JobDTO postJob( JobDTO jobDTO) throws Exception;

    public List<JobDTO> getAllJobs();

    public JobDTO getJob(Long id) throws JobPortalExpection;

    public void applyJob(Long id, ApplicantDTO applicantDTO) throws JobPortalExpection;

    public List<JobDTO> getJobPostedBy(Long id) throws JobPortalExpection;

    public void changeAppStatus(Application application) throws JobPortalExpection;
}
