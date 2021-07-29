package com.osds.bitz.controller.account.user;


import com.osds.bitz.model.network.request.BusinessAuthRequest;
import com.osds.bitz.model.network.request.ReadAuthRequest;
import com.osds.bitz.model.network.request.UpdatePasswordRequest;
import com.osds.bitz.model.network.response.BusinessAuthResponse;
import com.osds.bitz.model.network.response.UserAuthResponse;
import com.osds.bitz.service.account.business.BusinessAuthService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/accountbusiness")
@Api("Account 컨트롤러 API V1")
@Slf4j
public class BusinessAuthController {

    private BusinessAuthService businessAuthService;

    @PostMapping("/createbusiness")
    @ApiOperation(value = "회원가입", notes = "회원의 정보를 DB에 저장합니다.")
    public ResponseEntity<BusinessAuthResponse> createBusiness(@RequestBody @ApiParam(value = "회원 정보") BusinessAuthRequest businessAuthRequest) throws Exception {
        BusinessAuthResponse response = new BusinessAuthResponse(businessAuthService.createBusiness(businessAuthRequest));
        return new ResponseEntity<BusinessAuthResponse>(response, HttpStatus.OK);
    }

    @PostMapping("/readbusinessauth")
    @ApiOperation(value = "로그인", notes = "회원의 정보를 통해 로그인 처리를 합니다.")
    public ResponseEntity<BusinessAuthResponse> readBusinessAuth(@RequestBody @ApiParam(value = "회원 정보") ReadAuthRequest readAuthRequest) throws Exception {
        BusinessAuthResponse response = new BusinessAuthResponse(businessAuthService.readBusiness(readAuthRequest));
        if(response == null)
            return new ResponseEntity<BusinessAuthResponse>(response, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<BusinessAuthResponse>(response, HttpStatus.OK);
    }

    @PostMapping("/readfirstuserauth")
    @ApiOperation(value = "첫 로그인인지 확인", notes = "회원이 처음으로 로그인했는지 DB에서 확인합니다.")
    public ResponseEntity<BusinessAuthResponse> readFirstUserBusiness(@RequestBody @ApiParam(value = "회원 정보") ReadAuthRequest readUAuthRequest) throws Exception {
        BusinessAuthResponse response = new BusinessAuthResponse(businessAuthService.readFirstBusinessAuthRequest(readUAuthRequest));
        if (response == null) //최초 로그인이 아닙니다.
            return new ResponseEntity<BusinessAuthResponse>(response, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<BusinessAuthResponse>(response, HttpStatus.OK);
    }

    @PutMapping("/updatepassword")
    @ApiOperation(value = "비밀번호 변경하기", notes = "회원의 비밀번호를 DB에서 수정합니다.")
    public ResponseEntity<BusinessAuthResponse> updatePassword(@RequestBody @ApiParam(value = "회원 정보") UpdatePasswordRequest updatePasswordRequest) throws Exception {
        BusinessAuthResponse response = new BusinessAuthResponse(businessAuthService.updatePassword(updatePasswordRequest));
        return new ResponseEntity<BusinessAuthResponse>(response, HttpStatus.OK);
    }

    @PutMapping("/readpassword")
    @ApiOperation(value = "비밀번호 찾기", notes = "회원의 이메일에 비밀번호를 찾아서 임시 비밀번호를 이메일로 전송합니다.")
    public ResponseEntity<BusinessAuthResponse> readPassword(@RequestBody @ApiParam(value = " 비밀번호 찾기") BusinessAuthRequest businessAuthRequest) throws Exception {
        BusinessAuthResponse response = new BusinessAuthResponse(businessAuthService.readPassword(businessAuthRequest));
        return new ResponseEntity<BusinessAuthResponse>(response, HttpStatus.OK);
    }
}
