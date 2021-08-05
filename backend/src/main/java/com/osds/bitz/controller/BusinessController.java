package com.osds.bitz.controller;

import com.osds.bitz.model.network.request.account.ReadAuthRequest;
import com.osds.bitz.model.network.request.account.UpdatePasswordRequest;
import com.osds.bitz.model.network.request.account.BusinessAuthRequest;
import com.osds.bitz.model.network.response.account.BusinessAuthResponse;
import com.osds.bitz.service.BusinessService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/accountbusiness")
@Api("Account 컨트롤러 API V1")
@Slf4j
public class BusinessController {

    private BusinessService businessService;

    @PostMapping("/createbusiness")
    @ApiOperation(value = "회원가입", notes = "회원의 정보를 DB에 저장합니다.")
    public ResponseEntity<BusinessAuthResponse> createBusiness(@ApiParam(value = "회원 정보") BusinessAuthRequest businessAuthRequest) throws Exception {
        BusinessAuthResponse response = new BusinessAuthResponse(businessService.createBusiness(businessAuthRequest));

        return new ResponseEntity<BusinessAuthResponse>(response, HttpStatus.OK);
    }

    @PostMapping("/readbusinessauth")
    @ApiOperation(value = "로그인", notes = "회원의 정보를 통해 로그인 처리를 합니다.")
    public ResponseEntity<BusinessAuthResponse> readBusinessAuth(@RequestBody @ApiParam(value = "회원 정보") ReadAuthRequest readAuthRequest) throws Exception {
        BusinessAuthResponse response = new BusinessAuthResponse(businessService.readBusiness(readAuthRequest));
        if (response == null)
            return new ResponseEntity<BusinessAuthResponse>(response, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<BusinessAuthResponse>(response, HttpStatus.OK);
    }

    @PostMapping("/readfirstuserauth")
    @ApiOperation(value = "첫 로그인인지 확인", notes = "회원이 처음으로 로그인했는지 DB에서 확인합니다.")
    public ResponseEntity<BusinessAuthResponse> readFirstUserBusiness(@RequestBody @ApiParam(value = "회원 정보") ReadAuthRequest readUAuthRequest) throws Exception {
        BusinessAuthResponse response = new BusinessAuthResponse(businessService.readFirstBusinessAuthRequest(readUAuthRequest));
        if (response == null) //최초 로그인이 아닙니다.
            return new ResponseEntity<BusinessAuthResponse>(response, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<BusinessAuthResponse>(response, HttpStatus.OK);
    }

    @PutMapping("/updatepassword")
    @ApiOperation(value = "비밀번호 변경", notes = "회원의 비밀번호를 DB에서 수정합니다.")
    public ResponseEntity<BusinessAuthResponse> updatePassword(@RequestBody @ApiParam(value = "회원 정보") UpdatePasswordRequest updatePasswordRequest) throws Exception {
        BusinessAuthResponse response = new BusinessAuthResponse(businessService.updatePassword(updatePasswordRequest));
        return new ResponseEntity<BusinessAuthResponse>(response, HttpStatus.OK);
    }

    @PutMapping("/readpassword")
    @ApiOperation(value = "비밀번호 찾기", notes = "회원의 이메일에 비밀번호를 찾아서 임시 비밀번호를 이메일로 전송합니다.")
    public ResponseEntity<BusinessAuthResponse> readPassword(@RequestBody @ApiParam(value = " 회원 정보") BusinessAuthRequest businessAuthRequest) throws Exception {
        BusinessAuthResponse response = new BusinessAuthResponse(businessService.readPassword(businessAuthRequest));
        return new ResponseEntity<BusinessAuthResponse>(response, HttpStatus.OK);
    }

    @DeleteMapping("/deletebusinessauth")
    @ApiOperation(value = "회원탈퇴", notes = "회원의 계정을 DB에서 삭제합니다.")
    public ResponseEntity deleteBusinessAuth(@RequestBody @ApiParam(value = "회원 정보") ReadAuthRequest readAuthRequest) throws Exception {
        businessService.deleteBusinessAuth(readAuthRequest);
        return new ResponseEntity(HttpStatus.OK);
    }

//    @PostMapping("/readbusinessauth")
//    @ApiOperation(value="회원 프로필 출력", notes ="회원의 계정을 DB에서 찾아서 프로필을 출력합니다.")
//    public ResponseEntity<BusinessProfileResponse> readBusinessAuth(@RequestBody @ApiParam(value = " 회원 정보") BusinessProfileRequest businessProfileRequest) throws Exception{
//        BusinessProfileResponse response = new BusinessProfileResponse(businessAuthService.readBusinessProfile(businessProfileRequest));
//        return new ResponseEntity<BusinessProfileResponse> (response, HttpStatus,OK);
//    }

}
