package com.jobportal.api;

import com.jobportal.dto.ProfileDTO;
import com.jobportal.exception.JobPortalExpection;
import com.jobportal.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@Validated
@RequestMapping("/profiles")
public class ProfileAPI {
    @Autowired
    private ProfileService profileService;
    @GetMapping("/get/{id}")
    public ResponseEntity<ProfileDTO> getProfile(@PathVariable Long id) throws JobPortalExpection {
        return new  ResponseEntity<>(profileService.getProfile(id),HttpStatus.OK);
    }
    @GetMapping("/getAll")
    public ResponseEntity<List<ProfileDTO>> getAllProfiles() throws JobPortalExpection {
        return new  ResponseEntity<>(profileService.getAllProfiles(),HttpStatus.OK);
    }
    @PutMapping("/update")
    public ResponseEntity<ProfileDTO> updateProfile(@RequestBody ProfileDTO profileDTO) throws JobPortalExpection {
        return new  ResponseEntity<>(profileService.updateProfile(profileDTO),HttpStatus.OK);
    }



}
